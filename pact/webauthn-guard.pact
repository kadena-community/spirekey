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
      (invariant (< (length devices) 5))
      (invariant (> min-approvals 0))
      (invariant (> min-registration-approvals 0))
      (invariant (<= min-approvals (length devices)))
      (invariant (<= min-registration-approvals (length devices)))
    ]
    devices                    : [object{device-schema}]
    min-approvals              : integer
    min-registration-approvals : integer
  )
  (deftable account-table:{account-schema})

  (defcap AUTHORIZED() true)

  (defcap AUTHENTICATE(account:string)
    (with-read account-table account
      { 'devices       := devices
      , 'min-approvals := min-approvals
      }
      (enforce-guard-min (map (extract-guard) devices) min-approvals)
      (compose-capability (AUTHORIZED))
    )
  )

  (defcap REGISTER(account:string first-guard:guard)
    (enforce (validate-principal first-guard account) "Principal must match the first provided device")
  )

  (defcap ADD_DEVICE(account:string)
    (with-read account-table account
      { 'devices := devices
      , 'min-registration-approvals := min-registration-approvals
      }
      (enforce-guard-min (map (extract-guard) devices) min-registration-approvals)
    )
  )

  (defcap REMOVE_DEVICE(account:string)
    (with-read account-table account
      { 'devices := devices
      , 'min-registration-approvals := min-registration-approvals
      }
      (enforce-guard-min (map (extract-guard) devices) min-registration-approvals)
    )
  )

  (defcap COPY_ACCOUNT(account:string)
    (with-read account-table account
      { 'devices := devices
      , 'min-registration-approvals := min-registration-approvals
      }
      (enforce-guard-min (map (extract-guard) devices) min-registration-approvals)
    )
  )

  (defun extract-guard(device:object{device-schema})
    (at 'guard device)
  )

  (defun get-account(account:string)
    (read account-table account)
  )

  (defun register(
    min-approvals:integer
    min-registration-approvals:integer
    devices:[object{device-schema}]
  )
    (let (
      (first-guard (at 'guard (at 0 devices)))
    )
      (register-guard (create-principal first-guard) min-approvals min-registration-approvals devices)
    )
  )

  (defun register-guard(
    account:string
    min-approvals:integer
    min-registration-approvals:integer
    devices:[object{device-schema}]
  )
    @model [
      (property (> (length devices) 0))
      (property (> min-approvals 0))
      (property (> min-registration-approvals 0))
      (property (is-principal account))
    ]
    (enforce (> (length devices) 0) "Must register at least one device")
    (enforce (< (length devices) 5) "Must register less than 5 devices")
    (enforce (> min-approvals 0) "Must authenticate with at least one device")
    (enforce (> min-registration-approvals 0) "Must register at least one device")
    (enforce (<= min-approvals (length devices)) "Min approvals cannot be greater than the number of devices")
    (enforce (<= min-registration-approvals (length devices)) "Min registration approvals cannot be greater than the number of devices")
    (let ((first-guard (at 'guard (at 0 devices))))
      (with-capability (REGISTER account first-guard)
        (insert account-table account
          { 'devices : devices
          , 'min-approvals : min-approvals
          , 'min-registration-approvals : min-registration-approvals
          }
        )
      )
    )
  )

  (defun add-device(account:string device:object{device-schema})
    (with-capability (ADD_DEVICE account)
      (with-read account-table account
        { 'devices := devices }
        (let* (
          (new-devices (+ devices [device]))
          (expected-new-length (+ (length devices) 1))
          (unique-cred-ids (distinct (map (at 'credential-id) new-devices)))
        )
          (enforce (= expected-new-length (length unique-cred-ids)) "Credential IDs must be unique")
          (update account-table account
            { 'devices : new-devices }
          )
        )
      )
    )
  )

  (defun remove-device(account:string credential-id:string)
    (with-capability (REMOVE_DEVICE account)
      (with-read account-table account
        { 'devices                    := devices
        , 'min-approvals              := min-approvals
        , 'min-registration-approvals := min-registration-approvals
        }
        (let* 
          ((new-devices:[object{device-schema}] (filter (where 'credential-id (!= credential-id)) devices))
           (new-length (length new-devices))
          )
          (enforce (= 
            new-length
            (- (length devices) 1)
          ) "Must have exactly one fewer device after removal")
          (enforce (>= new-length min-approvals) "Must have enough devices to authenticate")
          (enforce (>= new-length min-registration-approvals) "Must have enough devices to register")
          (update account-table account
            { 'devices : new-devices }
          )
        )
      )
    )
  )

  (defpact copy-account(account:string target:string)
    (step
      (with-capability (COPY_ACCOUNT account)
        (yield (read account-table account) target)
      )
    )

    (step
      (resume 
        { 'min-approvals              := min-approvals
        , 'min-registration-approvals := min-registration-approvals
        , 'devices                    := devices
        }
        (write account-table account
          { 'min-approvals              : min-approvals
          , 'min-registration-approvals : min-registration-approvals
          , 'devices                    : devices
          }
        )
      )
    )
  )

  (defun enforce-authenticated(account:string)
    (with-read account-table account
      { 'devices       := devices
      , 'min-approvals := min-approvals
      }
      (enforce-guard-min (map (extract-guard) devices) min-approvals)
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
      (<= min-approvals
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
)

(if (read-msg 'upgrade)
  true
  (create-table account-table)
)
