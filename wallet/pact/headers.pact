(namespace (ns.create-principal-namespace (read-keyset 'l2-keyset )))

(module headers GOVERNANCE
  @model [
    (defproperty current-height (at 'height (read header-state-table 'latest 'before)))
    (defproperty updated-current-height (at 'height (read header-state-table 'latest 'after)))
  ]
  (defconst NS_HASH (ns.create-principal-namespace (read-keyset 'l2-keyset)))
  (defconst L2_KS_NAME (format "{}.{}" [NS_HASH 'l2-keyset]))
  (defconst MAX_ITEMS 100)

  (defcap GOVERNANCE()
    @doc "In this PoC the governance keyset, which can be a multisig, needs to sign for continuation requests"
    (enforce-keyset L2_KS_NAME)
  )

  ;;;;;;;;;;;;;;;;;;;;;;
  ; CROSSCHAIN HEADERS ;
  ;;;;;;;;;;;;;;;;;;;;;;
  (defschema header-schema
    @model [
      (invariant (<= (length items) MAX_ITEMS))
      (invariant (>= max-height 0))
    ]
    max-height : integer
    items      : [string]
  )
  (deftable header-table:{header-schema})

  (defschema header-state-schema
    @model [
      (invariant (>= height -1))
    ]
    height : integer
  )
  (deftable header-state-table:{header-state-schema})

  ;;;;;;;;;;;;;;;;;;;;;;;;;
  ; Header sync functions ;
  ;;;;;;;;;;;;;;;;;;;;;;;;;
  (defun submit-headers(max-height:integer items:[string])
    @model [
      (property (<= (length items) MAX_ITEMS))
      (property (> max-height current-height))
      (property (= (- max-height current-height) (length items)))
      (property (= updated-current-height max-height))
      (property (authorized-by "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2-keyset"))
    ]
    (with-capability (GOVERNANCE)
      (with-read header-state-table 'latest
        { 'height := current-height }
        (enforce (> max-height current-height) "Max height must be greater than current height")
        (enforce (<=
          (length items)
          MAX_ITEMS
        ) "Number of items must be less or equal to max items")
        (enforce (= (- max-height current-height) (length items)) "Number of items must be equal to max height - min height")
        (update header-state-table 'latest
          { 'height : max-height
          }
        )
        (insert header-table (format "{}" [max-height])
          { 'max-height : max-height
          , 'items      : items
          }
        )
      )
    )
  )

  (defun get-current-height()
    (with-read header-state-table 'latest
      { 'height := current-height }
      current-height
    )
  )
)

(if (read-msg 'upgrade)
  ["Upgrade successful"]
  [
    (create-table header-table)
    (create-table header-state-table)
    (insert header-state-table 'latest { 'height : 0 })
    (define-keyset l2.L2_KS_NAME (read-keyset 'l2-keyset))
    (enforce-guard l2.L2_KS_NAME)
  ]
)
