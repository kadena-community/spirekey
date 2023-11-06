(namespace (read-string 'webauthn-namespace))

(module webauthn GOVERNANCE
  @model [
    (defproperty get-account(account:string)
      (read account-table account 'after)
    )
    (defproperty get-registration-guard(account:string)
      (at 'registration-guard (get-account account))
    )
  ]
  (implements gas-payer-v1)

  (use fungible-v2)

  (defconst GOVERNANCE_KEYSET (read-string 'webauthn-keyset-name))

  (defcap GOVERNANCE()
    (enforce-guard GOVERNANCE_KEYSET)
  )

  (defcap REGISTER(account:string new-guard:guard)
    (compose-capability (AUTHENTICATE account))
    ; (enforce-guard new-guard)
  )

  (defcap AUTHENTICATE(account:string)
    (with-read account-table account
      { 'devices := devices }
      (enforce-guard-any (map (at 'guard) devices))
    )
  )

  (defcap TRANSFER(sender:string receiver:string amount:decimal)
    (compose-capability (AUTHENTICATE sender))
  )

  (defschema device-schema
    credential-id     : string
    credential-pubkey : string
    guard             : guard
  )

  (defschema account-schema
    devices : [object:{device-schema}]
  )
  (deftable account-table:{account-schema})

  (defun try-enforce-guard (g:guard)
    (try false (enforce-guard g))
  )

  (defun enforce-guard-any:bool (guards:[guard])
    "Will succeed if at least one guard in GUARDS is successfully enforced."
    (enforce
      (< 0
        (length
          (filter
            (= true)
            (map (try-enforce-guard) guards)
          )
        )
      )
      "None of the guards passed"
    )
  )

  (defun create-account(
    account:string
    fung:module{fungible-v2}
    registration-guard:guard
    credential-id:string
    credential-pubkey:string
  )
    @model [
      (property (!= account ""))
      (property (= (get-registration-guard account) registration-guard))
    ]
    (enforce (!= account "") "Account name cannot be empty")
    (enforce-guard registration-guard)
    (insert account-table account
      { 'devices              :
        [{ 'credential-id     : credential-id
         , 'credential-pubkey : credential-pubkey
         , 'guard             : registration-guard
        }]
      }
    )
    (try 
      (fung::create-account (get-account-name account) (get-account-guard account))
      (fung::details (get-account-name account))
    )
  )

  (defun add-authentication-guard(
    account:string
    registration-guard:guard
    credential-id:string
    credential-pubkey:string
  )
    @model [
      (property (row-enforced account-table 'registration-guard account))
    ]
    (with-capability (REGISTER account registration-guard)
      (with-read account-table account
        { 'devices := devices }
        (update account-table account
          { 'devices              :
            (+ [{ 'credential-id  : credential-id
             , 'credential-pubkey : credential-pubkey
             , 'guard             : registration-guard
            }] devices)
          }
        )
      )
    )
  )

  (defun get-account-name(account:string)
    (create-principal (create-capability-guard (AUTHENTICATE account)))
  )

  (defun get-account-guard(account:string)
    (create-capability-guard (AUTHENTICATE account))
  )

  (defun transfer(fung:module{fungible-v2} sender:string receiver:string amount:decimal)
    (with-capability (TRANSFER sender receiver amount)
      (install-capability (fung::TRANSFER (get-account-name sender) receiver amount))
      (fung::transfer (get-account-name sender) receiver amount)
    )
  )

  ;;;;;;;;;;;;;;;
  ; GAS PAYMENT ;
  ;;;;;;;;;;;;;;;
  (defcap GAS_PAYER:bool(user:string limit:integer price:decimal)
    (compose-capability (AUTHENTICATE user))
  )

  (defun create-gas-payer-guard:guard()
    (create-capability-guard (GAS_PAYER))
  )
)

(if (read-msg 'upgrade)
  ["Upgrade successful"]
  (let ((ks webauthn.GOVERNANCE_KEYSET))
    (enforce-guard ks)
    (create-table account-table)
  )
)
