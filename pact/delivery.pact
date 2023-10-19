(namespace (read-msg 'ns))

(module delivery GOVERNANCE
  @model [
    ;  Order status can be updated only in a specific transition order
    (defproperty expect-order-status-transition(initial-status:string next-status:string order-id:string order-status:string)
      (when
        (= (current-order-status order-id) initial-status)
        (= order-status next-status)))

    (defproperty get-order-price(order-id:string)
      (at 'order-price (read order-table order-id "before")))

    (defproperty current-order-status(order-id:string)
      (at 'order-status (read order-table order-id "before")))

    (defproperty current-order-status-after(order-id:string)
      (at 'order-status (read order-table order-id "after")))

    (defproperty get-delivery-stake(order-id:string)
      (* 2.0 (get-order-price order-id)))

    (defproperty get-order-price(order-id:string)
      (at 'order-price (read order-table order-id "before")))

    (defproperty get-delivery-price(order-id:string)
      (at 'delivery-price (read order-table order-id "before")))

    (defproperty get-courier(order-id:string)
      (at 'courier (read delivery-table order-id "before")))

    (defproperty get-buyer(order-id:string)
      (at 'buyer (read order-table order-id "before")))

    (defproperty get-merchant(order-id:string)
      (at 'merchant (read order-table order-id "before")))
  ]

  (use l2)
  (defconst NS_KEYSET:string (format "{}.{}" [l2.NS_HASH "l2-keyset"]))

  (defcap GOVERNANCE ()
    (enforce-keyset NS_KEYSET))

  (defconst CREATED "CREATED")
  (defconst READY_FOR_DELIVERY "READY_FOR_DELIVERY")
	(defconst IN_TRANSIT "IN_TRANSIT")
  (defconst DELIVERED "DELIVERED")
  ; CANCELED, DISPUTED

  (defconst ESCROW_ID (create-principal (create-capability-guard (ESCROW))))

  (defconst MINIMUM_PRECISION l2.MINIMUM_PRECISION
    "Minimum allowed precision for l2 transactions"
  )

  (defschema order-schema
    @doc "Order table schema"

    @model [
      (invariant
        (or (= CREATED order-status)
        (or (= READY_FOR_DELIVERY order-status)
        (or (= IN_TRANSIT order-status)
            (= DELIVERED order-status)))))
      (invariant (> order-price 0.0))
      (invariant (= order-price (floor order-price MINIMUM_PRECISION)))
      (invariant (> delivery-price 0.0))
      (invariant (= delivery-price (floor delivery-price MINIMUM_PRECISION)))
    ]
	  order-id       : string ; TODO : look back if this is required
    order-status   : string
    merchant       : string
    merchant-guard : guard
    buyer          : string
    buyer-guard    : guard
    order-price    : decimal
    delivery-price : decimal)

	(deftable order-table:{order-schema})

  (defschema delivery-schema
    @doc "Delivery table schema - the id has an implicit relation to the order itself"
    courier       : string
	  courier-guard : guard)

  (deftable delivery-table:{delivery-schema})

  (defcap BUYER (order-id:string)
    @doc "Capability that validates if action is done by buyer (customer)"
    (with-read order-table order-id
      { 'buyer-guard := buyer-guard }
      (enforce-guard buyer-guard)))

  (defcap MERCHANT (order-id:string)
    @doc "Capability that validates if action is done by merchant"
    (with-read order-table order-id
      { 'merchant-guard := merchant-guard }
      (enforce-guard merchant-guard)))

  (defcap COURIER (order-id:string)
    @doc "Capability that validates if action is done by courier (delivery party)"
    (with-read delivery-table order-id
      { 'courier-guard := courier-guard }
      (enforce-guard courier-guard)))

  (defcap CREATE_ORDER (merchant-guard:guard buyer-guard:guard)
    @doc "Capability validates that both merchant and buyer should sign an order"
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (RESERVE_FUNDS))
    (enforce-guard merchant-guard)
    (enforce-guard buyer-guard))

  (defcap SET_READY_FOR_DELIVERY(order-id:string)
    @doc "Capability validates that the order is ready for delivery"
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (MERCHANT order-id))
  )

  (defcap DELIVER_ORDER (order-id:string)
    @doc "Capability validates that both courier and buyer should sign the delivery"
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (BUYER order-id))
    (compose-capability (COURIER order-id)))

  (defcap PICKUP_DELIVERY (order-id:string courier-guard:guard)
    @doc "Capability validates that the courier has signed for the pickup"
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (RESERVE_FUNDS))
    (enforce-guard courier-guard)
  )

  (defcap UPDATE_ORDER_STATUS()
    @doc "Capability validates that the order status can be updated"
    true
  )

  (defcap RESERVE_FUNDS()
    @doc "Capability validates that the funds can be reserved"
    true
  )

  (defcap ESCROW ()
    @doc "Capability for escrow account"
    true)

  (defun create-order (
    order-id       : string
    merchant       : string
    merchant-guard : guard
    buyer          : string
    buyer-guard    : guard
    order-price    : decimal
    delivery-price : decimal)
    @doc "Creates an order in the order table and reserves funds to the escrow account"
    @model [
      (property (> order-price 0.0))
      (property (> delivery-price 0.0))
      (property (not (row-exists order-table order-id 'before)))
      (property (= (current-order-status-after order-id) CREATED))
      (property (row-enforced l2-coin-table 'guard merchant))
      (property (row-enforced l2-coin-table 'guard buyer))
      (property
        (when (= buyer merchant)
          (=
            (- (+ (+ order-price delivery-price) order-price))
            (cell-delta l2-coin-table 'balance buyer)
          )
        )
      )
      (property
        (when (!= buyer merchant)
          (=
            (- (+ order-price delivery-price))
            (cell-delta l2-coin-table 'balance buyer)
          )
        )
      )
      (property
        (when (!= buyer merchant)
          (=
            (- order-price)
            (cell-delta l2-coin-table 'balance merchant)
          )
        )
      )
      (property
        (=
          (+ (* 2 order-price) delivery-price)
          (cell-delta l2-coin-table 'balance ESCROW_ID)
        )
      )
      (property (= order-price (at 'order-price (read order-table order-id 'after))))
      (property (= delivery-price (at 'delivery-price (read order-table order-id 'after))))
    ]
    (enforce (< 0.0 order-price) "Order price is not a positive number")
    (enforce (< 0.0 delivery-price) "Delivery price is not a positive number")

    (with-capability (CREATE_ORDER merchant-guard buyer-guard)
      (enforce (= (floor order-price MINIMUM_PRECISION) order-price) "Order price exeeds minimum allowed precision decimals")
      (enforce (= (floor delivery-price MINIMUM_PRECISION) delivery-price) "Delivery price exeeds minimum allowed precision decimals")
      (insert order-table order-id {
        "order-id"       : order-id,
        "order-status"   : CREATED,
        "merchant"       : merchant,
        "merchant-guard" : merchant-guard,
        "buyer"          : buyer,
        "buyer-guard"    : buyer-guard,
        "order-price"    : order-price,
        "delivery-price" : delivery-price
      })
      (reserve-funds order-id buyer (+ order-price delivery-price))
      (reserve-funds order-id merchant (get-merchant-deposit-amount order-price))
    )
  )

  (defun get-order-status(order-id:string)
    (with-read order-table order-id
    { 'order-status := order-status }
    order-status))

  (defun update-order-status(order-id:string order-status:string)
    @model [
      ; Order status can not be empty
      (property (!= order-status ""))
      ; Order status can be updated only in a specific transition order
      (property
        (or (expect-order-status-transition CREATED READY_FOR_DELIVERY order-id order-status)
        (or (expect-order-status-transition READY_FOR_DELIVERY IN_TRANSIT order-id order-status)
            (expect-order-status-transition IN_TRANSIT DELIVERED order-id order-status)))
      )
    ]
    (require-capability (UPDATE_ORDER_STATUS))

    (let ((current (get-order-status order-id)))
      (enforce-one "Order status can be updated only in a specific transition order" [
        (enforce (and
          (= current CREATED)
          (= order-status READY_FOR_DELIVERY))
          "Order status can be updated to READY_FOR_DELIVERY only from CREATED")
        (enforce (and
          (= current READY_FOR_DELIVERY)
          (= order-status IN_TRANSIT))
          "Order status can be updated to IN_TRANSIT only from READY_FOR_DELIVERY")
        (enforce (and
          (= current IN_TRANSIT)
          (= order-status DELIVERED))
          "Order status can be updated to DELIVERED only from IN_TRANSIT")
      ])

      (update order-table order-id { 'order-status : order-status })
    )
  )

  (defun get-order-price(order-id:string)
    (with-read order-table order-id
      { 'order-price := order-price }
      order-price))

  (defun set-order-ready-for-delivery(order-id:string merchant-guard:guard)
    @doc "Allow the merchant to mark the product ready for delivery"
    @model [
      (property (= (current-order-status order-id) CREATED))
      (property (row-enforced order-table 'merchant-guard order-id))
    ]
    (with-capability (SET_READY_FOR_DELIVERY order-id)
      (update-order-status order-id READY_FOR_DELIVERY)))

  (defun get-courier-deposit-amount:decimal (order-price:decimal)
    @doc "Calculate the courier deposit (stake) - equal to 2 times order price"
    @model [
      (property (= result (* 2.0 order-price)))
    ]
    (* 2.0 order-price))

  (defun get-merchant-deposit-amount:decimal (order-price:decimal)
    @doc "Calculate the amount of the merchant's deposit (stake) - equal to the order price"
    @model [
      (property (= result order-price))
    ]
    order-price)

  (defun reserve-funds (order-id:string sender:string amount:decimal)
    @model [
      (property (!= order-id ""))
      (property (is-principal sender))
      (property (> amount 0.0))
      (property (= (- amount) (cell-delta l2-coin-table 'balance sender)))
      (property (= amount (cell-delta l2-coin-table 'balance ESCROW_ID)))
    ]
    (require-capability (RESERVE_FUNDS))
    (enforce (!= order-id "") "Order id can not be empty")
    (install-capability (l2.TRANSFER sender ESCROW_ID amount))
    (l2.transfer sender ESCROW_ID amount)
  )

  (defun pickup-delivery(order-id:string courier:string courier-guard:guard)
    @model [
      (property (= (current-order-status order-id) READY_FOR_DELIVERY))
      (property (= (current-order-status-after order-id) IN_TRANSIT))
      (property (is-principal courier))
      (property (= (- (get-delivery-stake order-id)) (cell-delta l2-coin-table 'balance courier)))
      (property (= (get-delivery-stake order-id) (cell-delta l2-coin-table 'balance ESCROW_ID)))
      (property (row-exists delivery-table order-id 'after))
      (property (not (row-exists delivery-table order-id 'before)))
      (property (row-enforced l2-coin-table 'guard courier))
    ]
    (with-capability (PICKUP_DELIVERY order-id courier-guard)
      (with-read order-table order-id
        { 'order-status := order-status
        , 'order-price    := order-price }
        (enforce (= order-status READY_FOR_DELIVERY) "Order status is not READY_FOR_DELIVERY")
        (reserve-funds order-id courier (get-courier-deposit-amount order-price))
        (update-order-status order-id IN_TRANSIT)
        (validate-principal courier-guard courier)
        (insert delivery-table order-id
          { 'courier        : courier
          , 'courier-guard  : courier-guard
          }
        )
      )
    )
  )

  (defun deliver-order(order-id:string)
    @model [
      (property (= (current-order-status order-id) IN_TRANSIT))
      (property (= (current-order-status-after order-id) DELIVERED))
      (property
        (when (!= (get-courier order-id) (get-merchant order-id))
          (and
            (=
              (+ (get-delivery-stake order-id)
                 (get-delivery-price order-id))
              (cell-delta l2-coin-table 'balance (get-courier order-id))
            )
            (=
              (* (get-order-price order-id) 2.0)
              (cell-delta l2-coin-table 'balance (get-merchant order-id))
            )
          )
        )
      )
      (property
        (when (= (get-courier order-id) (get-merchant order-id))
          (=
            (+ (+ (get-delivery-stake order-id)
                  (get-delivery-price order-id))
               (* 2.0 (get-order-price order-id)))
            (cell-delta l2-coin-table 'balance (get-courier order-id))
          )
        )
      )
      (property
        (when (= (get-courier order-id) (get-merchant order-id))
          (=
            (cell-delta l2-coin-table 'balance (get-courier order-id))
            (abs (cell-delta l2-coin-table 'balance ESCROW_ID))
          )
        )
      )
      (property
        (when (!= (get-courier order-id) (get-merchant order-id))
          (=
            (+ (cell-delta l2-coin-table 'balance (get-courier order-id))
               (cell-delta l2-coin-table 'balance (get-merchant order-id)))
            (abs (cell-delta l2-coin-table 'balance ESCROW_ID))
          )
        )
      )
      (property (row-enforced delivery-table 'courier-guard order-id))
      (property (row-enforced order-table 'buyer-guard order-id))
    ]
    (with-capability (DELIVER_ORDER order-id)
      (with-read order-table order-id
        { 'merchant       := merchant
        , 'order-price    := order-price
        , 'delivery-price := delivery-price
        }
        (with-read delivery-table order-id
          { 'courier := courier }
          (l2.transfer ESCROW_ID courier (+ (get-courier-deposit-amount order-price) delivery-price))
          (l2.transfer ESCROW_ID merchant (+ (get-merchant-deposit-amount order-price) order-price))
          (update-order-status order-id DELIVERED)
        )
      )
    )
  )
)

; Deployment
(if (read-msg 'upgrade)
  ["upgrade"]
  [
    (create-table order-table)
    (create-table delivery-table)
    (l2.create-account delivery.ESCROW_ID (create-capability-guard (delivery.ESCROW)))
  ]
)
