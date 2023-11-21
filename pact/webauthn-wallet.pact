(namespace (read-string 'webauthn-wallet-namespace))

(module webauthn-wallet GOVERNANCE
  (defconst GOVERNANCE_KEYSET (read-string 'webauthn-wallet-keyset-name))

  (use coin)
  (use webauthn-guard)

  (defcap GOVERNANCE()
    (enforce-guard GOVERNANCE_KEYSET)
  )
  
  (defcap DEBIT(account:string) true)

  (defcap TRANSFER(sender:string receiver:string amount:decimal)
    @managed amount TRANSFER-mgr
    (webauthn-guard.enforce-authenticated sender)
    (compose-capability (DEBIT sender))
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

  (defun get-account-name(account:string)
    (create-principal (get-account-guard account))
  )

  (defun get-account-guard(account:string)
    (enforce (is-principal account) "Account must be a principal")
    (create-capability-guard (DEBIT account))
  )

  (defun create(account:string)
    @model [
      (property (is-principal account))
    ]
    (coin.create-account (get-account-name account) (get-account-guard account))
  )

  (defun transfer(sender:string receiver:string amount:decimal)
    (let ((account (get-account-name sender)))
      (with-capability (TRANSFER account receiver amount)
        (install-capability (coin.TRANSFER account receiver amount))
        (coin.transfer account (get-account-name receiver) amount)
      )
    )
  )

  ;;;;;;;;;;;;;;;
  ; GAS PAYMENT ;
  ;;;;;;;;;;;;;;;
  (implements gas-payer-v1)

  (defcap GAS_PAYER:bool(user:string limit:integer price:decimal)
    (enforce (= (at 'sender (chain-data)) user) "Sender must be the user")
    (compose-capability (DEBIT user))
  )

  (defun create-gas-payer-guard:guard()
    (enforce false "This should never be called and is only implemented to satisfy the interface")
  )
)
