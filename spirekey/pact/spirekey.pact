(namespace (read-string 'webauthn-namespace))

(module spirekey GOVERNANCE
  (implements gas-payer-v1)

  (use fungible-v2)
  (use util.guards1)

  (defconst NS_NAME (read-string 'webauthn-namespace))
  (defconst GOVERNANCE_KEYSET (read-string 'webauthn-keyset-name))
  (defcap GOVERNANCE() (enforce-guard GOVERNANCE_KEYSET))
  (defschema account-schema
    devices: [object{device-pair-schema}]
  )
  (defschema device-pair-schema
    guard         : guard
    credential-id : string
    domain        : string
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

  (defcap REGISTER_CREDENTIAL(credential-id:string pubkey:string domain:string)
    @event
    true
  )

  (defun register-credential(credential-id:string pubkey:string domain:string)
    (emit-event (REGISTER_CREDENTIAL credential-id pubkey domain))
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

  (defun details(account:string fungible:module{fungible-v2})
    (let (
      (fungible-name (format "{}" [fungible]))
      (account-id (format "{}-{}" [account fungible]))
      (fungible-details (fungible::details account))
    ) 
      (with-read account-table account-id
        { 'devices := devices }
        (bind fungible-details 
          { 'account  := account-name
          , 'guard    := guard
          , 'balance  := balance
          }
          { 'account : account-name
          , 'guard   : guard
          , 'balance : balance
          , 'devices : devices
          }
        )
      )
    )
  )

  ;;;;;;;;;;;;;;;
  ; GAS STATION ;
  ;;;;;;;;;;;;;;;

  (defconst GAS_STATION 
    (create-principal (create-capability-guard (ALLOW_GAS)))
  )

  (defcap GAS_PAYER:bool(user:string limit:integer price:decimal)
    (enforce-one [
      (enforce 
        (try false 
          (contains 
            (format "({}.spirekey." [NS_NAME])
            (read-msg 'exec-code)
          )
        )
        "Only spirekey operations are paid for"
      )
      (enforce
        (try
          false
          (= (read-msg 'tx-type) 'cont)
        )
        "only continuation transactions are paid for"
      )
    ])

    (enforce-below-or-at-gas-price 0.0000001)
    (enforce-below-gas-limit 2000)
    (compose-capability (ALLOW_GAS))
  )
  (defcap ALLOW_GAS() true)

  (defun init() 
    (coin.create-account
      GAS_STATION
      (create-capability-guard (ALLOW_GAS))
    )
  )
)
(if (read-msg 'upgrade)
  true
  [
    (create-table spirekey.account-table)
    (spirekey.init)
  ]
)
