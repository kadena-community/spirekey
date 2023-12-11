(namespace (read-string 'webauthn-namespace))

(module webauthn-wallet GOVERNANCE
  (defconst GOVERNANCE_KEYSET (read-string 'webauthn-keyset-name))

  (use coin)
  (use webauthn-guard)

  (defcap GOVERNANCE()
    (enforce-guard GOVERNANCE_KEYSET)
  )
  
  (defcap DEBIT(account:string)
    (enforce-authenticated account)
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
    (with-read guard-lookup-table account
      { 'webauthn-guard-name := guard-name }
      (webauthn-guard.add-device guard-name device)
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
