(namespace (read-string 'webauthn-namespace))

(module spirekey GOVERNANCE
  (use fungible-v2)

  (defconst GOVERNANCE_KEYSET (read-string 'webauthn-keyset-name))
  (defcap GOVERNANCE() (enforce-guard GOVERNANCE_KEYSET))
  (defschema account-schema
    devices: [object{device-pair-schema}]
  )
  (defschema device-pair-schema
    guard         : guard
    credential-id : string
    hostname      : string
    device-type   : string
    color         : string
  )
  (deftable account-table:{account-schema})

  (defcap ADD_DEVICE(account:string fungible:string credential-id:string)
    @event
    true
  )

  (defcap REMOVE_DEVICE(account:string fungible:string credential-id:string)
    @event
    true
  )

  (defun add-device-pair(
    account       : string
    fungible      : module{fungible-v2}
    device        : object{device-pair-schema}
  )
    (let (
      (fungible-name (format "{}" [fungible]))
      (account-id (format "{}-{}" [account fungible]))
    )
      (with-capability (ADD_DEVICE account fungible-name (at 'credential-id device))
        (enforce-guard (at 'guard (fungible::details account)))
        (with-default-read account-table account-id
          { 'devices :  [] }
          { 'devices := devices } 
          (write account-table account-id
            { 'devices : (+ devices [device]) }
          )
        )
      )
    )
  )

  (defun remove-device-pair(
    account       : string
    fungible      : module{fungible-v2}
    credential-id : string
  )
    (let (
      (fungible-name (format "{}" [fungible]))
      (account-id (format "{}-{}" [account fungible]))
    ) 
      (with-capability (REMOVE_DEVICE account fungible-name credential-id)
        (enforce-guard (at 'guard (fungible::details account)))
        (with-read account-table account-id
          { 'devices := devices }
          (update account-table account-id
            { 'devices : 
              (filter
                (compose (at 'credential-id) (!= credential-id))
                devices
              )
            }
          )
        )
      )
    )
  )
)
(create-table spirekey.account-table)
