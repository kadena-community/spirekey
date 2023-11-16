(namespace (read-string 'smart-wallet-namespace))

(interface policy-v1
  (defcap DEBIT:bool(account:string))
  (defcap MODIFY:bool(account:string))
  (defun enforce-transfer-policy:bool(account:string to:string amount:decimal))
  (defun enforce-modify-policy:bool(account:string))
)

(module webauthn-policy-v1 GOVERNANCE
  (defconst GOVERNANCE_KEYSET (read-string 'smart-wallet-keyset-name))

  (use webauthn-guard)

  (implements policy-v1)

  (defcap GOVERNANCE()
    (enforce-guard GOVERNANCE_KEYSET)
  )

  (defcap DEBIT:bool(account:string)
    true
  )
  (defcap MODIFY:bool(account:string)
    true
  )

  (defun enforce-transfer-policy:bool(account:string to:string amount:decimal)
    (webauthn-guard.enforce-authenticated account)
  )
  (defun enforce-modify-policy:bool(account:string)
    (webauthn-guard.enforce-authenticated account)
  )
)

(module smart-wallet GOVERNANCE
  (defconst GOVERNANCE_KEYSET (read-string 'smart-wallet-keyset-name))
  
  (use fungible-v2)

  (defcap GOVERNANCE()
    (enforce-guard GOVERNANCE_KEYSET)
  )

  (defschema wallet-schema
    @model [
      (invariant (> (length policies) 0))
    ]
    policies: [module{policy-v1}]
  )
  (deftable wallet-table:{wallet-schema})

  (defun create(account:string guard:guard)
    (insert wallet-table account
      { 'policies : [webauthn-policy-v1] }
    )
  )
)
