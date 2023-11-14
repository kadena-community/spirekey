(namespace (read-string 'webauthn-namespace))

(module webauthn-guard GOVERNANCE
  @model [
    (defproperty get-account-after(account:string)
      (read account-table account 'after)
    )
    (defproperty get-account-before(account:string)
      (read account-table account 'before)
    )
    (defproperty get-devices-after(account:string)
      (at 'devices (get-account-after account))
    )
    (defproperty get-devices-before(account:string)
      (at 'devices (get-account-before account))
    )
  ]

  (defconst GOVERNANCE_KEYSET (read-string 'webauthn-keyset-name))

  (defcap GOVERNANCE()
    (enforce-guard GOVERNANCE_KEYSET)
  )

  (defschema device-schema
    name          : string
    domain        : string
    credential-id : string
    guard         : guard
  )
  (defschema account-schema
    @model [
      (invariant (> (length devices) 0))
      (invariant (> min-approvals 0))
      (invariant (> min-registration-approvals 0))
      (invariant (< min-approvals (length devices)))
      (invariant (< min-registration-approvals (length devices)))
    ]
    devices                    : [object{device-schema}]
    min-approvals              : integer
    min-registration-approvals : integer
  )
  (deftable account-table:{account-schema})

  (defcap AUTHORIZED() true)

  (defcap AUTHENTICATE(account:string min-approvals:integer)
    (enforce (> min-approvals 0) "Must authenticate with at least one device")
    (with-read account-table account
      { 'devices := devices }
      (enforce-guard-min (map (extract-guard) devices) min-approvals)
      (compose-capability (AUTHORIZED))
    )
  )

  (defun extract-guard(device:object{device-schema})
    (at 'guard device)
  )

  (defun register(
    account:string
    min-approvals:integer
    min-registration-approvals:integer
    devices:[object{device-schema}]
  )
    @model [
      (property (> (length devices) 0))
      (property (> min-approvals 0))
      (property (> min-registration-approvals 0))
    ]
    (enforce (> (length devices) 0) "Must register at least one device")
    (enforce (> min-approvals 0) "Must authenticate with at least one device")
    (enforce (> min-registration-approvals 0) "Must register at least one device")
    (enforce (< min-approvals (length devices)) "Min approvals cannot be greater than the number of devices")
    (enforce (< min-registration-approvals (length devices)) "Min registration approvals cannot be greater than the number of devices")
    (insert account-table account
      { 'devices : devices
      , 'min-approvals : min-approvals
      , 'min-registration-approvals : min-registration-approvals
      }
    )
  )

  (defun add-device(account:string device:object{device-schema})
    (with-read account-table account
      { 'devices := devices
      , 'min-registration-approvals := min-registration-approvals
      }
      (enforce-guard-min (map (extract-guard) devices) min-registration-approvals)
      (update account-table account
        { 'devices : (+ devices [device]) }
      )
    )
  )

  ;;;;;;;;;;;;;;;
  ; Guard Utils ;
  ;;;;;;;;;;;;;;;

  (defun try-enforce-guard (g:guard)
    (try false (enforce-guard g))
  )

  (defun enforce-guard-any:bool (guards:[guard])
    "Will succeed if at least one guard in GUARDS is successfully enforced."
    (enforce-guard-min guards 1)
  )

  (defun enforce-guard-min:bool (guards:[guard] min-approvals:integer)
    "Will succeed if at least MIN-APPROVALS guards in GUARDS are successfully enforced."
    (enforce
      (>= min-approvals
        (length
          (filter
            (= true)
            (map (try-enforce-guard) guards)
          )
        )
      )
      "Not enough guards passed"
    )
  )

  ;;;;;;;;;;;;;;;
  ; GAS PAYMENT ;
  ;;;;;;;;;;;;;;;

  (implements gas-payer-v1)

  (defcap GAS_PAYER:bool(user:string limit:integer price:decimal)
    (enforce (= (at 'sender (chain-data)) user) "Sender must be the user")
    (compose-capability (AUTHENTICATE user limit))
  )

  (defun create-gas-payer-guard:guard()
    (create-capability-guard (AUTHORIZED))
  )
)
