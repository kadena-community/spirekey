(namespace (read-string 'webauthn-wallet-namespace))

(module webauthn-wallet GOVERNANCE
  (defconst GOVERNANCE_KEYSET (read-string 'webauthn-wallet-keyset-name))
  
  (use fungible-v2)
  (use webauthn-guard)

  (defcap GOVERNANCE()
    (enforce-guard GOVERNANCE_KEYSET)
  )

  (defun create(account:string guard:guard)
    @model [
      (property (is-principal account))
    ]
    (enforce (validate-principal guard account) "Account and guard must match")
    (insert wallet-table account
      { 'policies : [webauthn-policy-v1] }
    )
  )

  ;;;;;;;;;;;;;;;
  ; GAS PAYMENT ;
  ;;;;;;;;;;;;;;;
  (implements gas-payer-v1)

  (defcap GAS_PAYER:bool(user:string limit:integer price:decimal)
    (enforce (= (at 'sender (chain-data)) user) "Sender must be the user")
    (compose-capability (AUTHENTICATE user))
  )

  (defun create-gas-payer-guard:guard()
    (create-capability-guard (AUTHORIZED))
  )
)
