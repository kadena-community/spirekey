(namespace (read-string 'webauthn-namespace))

(module webauthn-wallet GOVERNANCE
  (defconst GOVERNANCE_KEYSET (read-string 'webauthn-keyset-name))

  (use coin)
  (use webauthn-guard)
  (use fungible-v2)
  (use fungible-xchain-v1)

  (defcap GOVERNANCE()
    (enforce-guard GOVERNANCE_KEYSET)
  )
  
  (defcap DEBIT(account:string)
    (webauthn-guard.enforce-authenticated account)
  )

  (defcap ADD_DEVICE(account:string)
    true
  )

  (defcap REMOVE_DEVICE(account:string)
    true
  )

  (defcap COPY_ACCOUNT(account:string)
    true
  )

  (defcap LOGIN(account:string)
    @doc "Login to account for duration seconds"
    (enforce-authenticated account)
  )

  (defcap TRANSFER_XCHAIN
    ( sender:string
      receiver:string
      amount:decimal
      target-chain:string
    )  
    (with-read guard-lookup-table sender
      { 'webauthn-guard-name := guard-name }
      (compose-capability (DEBIT guard-name))
    )
  )

  (defcap TRANSFER(sender:string receiver:string amount:decimal)
    @managed amount TRANSFER-mgr
    (with-read guard-lookup-table sender
      { 'webauthn-guard-name := guard-name }
      (compose-capability (DEBIT guard-name))
    )
  )

  (defun TRANSFER-mgr:decimal(managed:decimal requested:decimal)
    @doc " Manages TRANSFER AMOUNT linearly, \
         \ such that a request for 1.0 amount on a 3.0 \
         \ managed quantity emits updated amount 2.0."
    (enforce (>= managed requested)
      (format "TRANSFER exceeded for balance {}" [managed])
    )
    managed
  )

  (defschema guard-lookup-schema
    webauthn-guard-name : string
  )
  (deftable guard-lookup-table:{guard-lookup-schema})

  (defun get-account-name(account:string)
    (create-principal (get-account-guard account))
  )

  (defun get-webauthn-guard(account:string)
    (with-read guard-lookup-table account
      { 'webauthn-guard-name := guard-name }
      (webauthn-guard.get-account guard-name)
    )
  )

  (defun get-wallet-guard(account:string)
    (with-read guard-lookup-table account
      { 'webauthn-guard-name := guard-name }
      (get-account-guard guard-name)
    )
  )

  (defun get-account-guard:guard(account:string)
    (enforce (is-principal account) "Account must be a principal")
    (create-capability-guard (DEBIT account))
  )

  (defun create-wallet(
    min-approvals:integer
    min-registration-approvals:integer
    devices:[object{device-schema}]
  )
    (let* (
      (first-guard (at 'guard (at 0 devices)))
      (guard-name (create-principal first-guard))
      (account-name:string (get-account-name guard-name))
      (account-guard:guard (get-account-guard guard-name))
    )
      (register min-approvals min-registration-approvals devices)
      (coin.create-account account-name account-guard)
      (insert guard-lookup-table account-name
        { 'webauthn-guard-name : guard-name }
      )
      account-name
    )
  )

  (defun transfer(sender:string receiver:string amount:decimal)
    (with-capability (TRANSFER sender receiver amount)
      (install-capability (coin.TRANSFER sender receiver amount))
      (coin.transfer sender receiver amount)
    )
  )

  (defun add-device(account:string device:object{device-schema})
    (with-capability (ADD_DEVICE account)
      (with-read guard-lookup-table account
        { 'webauthn-guard-name := guard-name }
        (webauthn-guard.add-device guard-name device)
      )
    )
  )

  (defun remove-device(account:string credential-id:string)
    (with-capability (REMOVE_DEVICE account)
      (with-read guard-lookup-table account
        { 'webauthn-guard-name := guard-name }
        (webauthn-guard.remove-device guard-name credential-id)
      )
    )
  )

  (defun login(account:string)
    (with-capability (LOGIN account)
      true
    )
  )

  (defschema copy-account-schema
    guard-name : string
  )

  (defpact copy-account:string(account:string target:string)
    (step
      (with-capability (COPY_ACCOUNT account)
        (with-read guard-lookup-table account
          { 'webauthn-guard-name := guard-name }
          (webauthn-guard.copy-account guard-name target)

          (let ((yield-data:object{copy-account-schema} { 'guard-name : guard-name }))
            (yield yield-data)
          )
        )
      )
    )

    (step
      (resume 
        { 'guard-name := guard-name }
        (continue (webauthn-guard.copy-account guard-name target))
      )
    )
  )

  (defpact transfer-crosschain:string
    ( sender:string
      receiver:string
      receiver-guard:guard
      target-chain:string
      amount:decimal
    )
    (step 
      (with-capability (TRANSFER_XCHAIN sender receiver amount target-chain)
        (install-capability (coin.TRANSFER sender receiver amount))
        (coin.transfer-crosschain sender receiver receiver-guard target-chain amount)
      )
    )
    (step
      (continue (coin.transfer-crosschain sender receiver receiver-guard target-chain amount))
    )
  )

  (defun enforce-authenticated(account:string)
    (with-read guard-lookup-table account
      { 'webauthn-guard-name := guard-name }
      (webauthn-guard.enforce-authenticated guard-name)
    )
  )

  ;;;;;;;;;;;;;;;;
  ; Fungible API ;
  ;;;;;;;;;;;;;;;;

  (defun create-fungible-account(account:string fung:module{fungible-v2})
    (with-read guard-lookup-table account
      { 'webauthn-guard-name := guard-name }
      (fung::create-account account (get-account-guard guard-name))
    )
  )

  (defun transfer-fungible(sender:string receiver:string amount:decimal fung:module{fungible-v2})
    (with-capability (TRANSFER sender receiver amount)
      (install-capability (fung::TRANSFER sender receiver amount))
      (fung::transfer sender receiver amount)
    )
  )

  (defpact transfer-crosschain-fungible:string
    ( sender:string
      receiver:string
      receiver-guard:guard
      target-chain:string
      amount:decimal
      fung:module{fungible-v2,fungible-xchain-v1}
    )
    (step 
      (with-capability (TRANSFER_XCHAIN sender receiver amount target-chain)
        (install-capability (fung::TRANSFER_XCHAIN sender receiver amount target-chain))
        (fung::transfer-crosschain sender receiver receiver-guard target-chain amount)
      )
    )
    (step
      (continue (fung::transfer-crosschain sender receiver receiver-guard target-chain amount))
    )
  )
  
  ;;;;;;;;;;;;;;;
  ; GAS PAYMENT ;
  ;;;;;;;;;;;;;;;
  (implements gas-payer-v1)

  (defcap GAS_PAYER:bool(user:string limit:integer price:decimal)
    (with-read guard-lookup-table user
      { 'webauthn-guard-name := guard-name }
      (compose-capability (DEBIT guard-name))
    )
  )

  (defun create-gas-payer-guard:guard()
    (create-capability-guard (GOVERNANCE))
  )
)

(if (read-msg 'upgrade)
  true
  (create-table guard-lookup-table)
)
