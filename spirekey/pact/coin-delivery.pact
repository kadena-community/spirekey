(namespace (read-string 'webauthn-namespace))

(module delivery GOVERNANCE
  @model [
    ;  Order status can be updated only in a specific transition order
    (defproperty expect-order-status-transition(initial-status:string next-status:string order-id:string order-status:string)
      (when
        (= (current-order-status order-id) initial-status)
        (= order-status next-status)
      )
    )

    (defproperty get-order-price(order-id:string)
      (at 'order-price (read order-table order-id 'before))
    )

    (defproperty current-order-status(order-id:string)
      (at 'order-status (read order-table order-id 'before))
    )

    (defproperty current-order-status-after(order-id:string)
      (at 'order-status (read order-table order-id 'after))
    )

    (defproperty get-delivery-stake(order-id:string)
      (* 2.0 (get-order-price order-id))
    )

    (defproperty get-order-price(order-id:string)
      (at 'order-price (read order-table order-id 'before))
    )

    (defproperty get-delivery-price(order-id:string)
      (at 'delivery-price (read order-table order-id 'before))
    )

    (defproperty get-courier(order-id:string)
      (at 'courier (read delivery-table order-id 'before))
    )

    (defproperty get-buyer(order-id:string)
      (at 'buyer (read order-table order-id 'before))
    )

    (defproperty get-merchant(order-id:string)
      (at 'merchant (read order-table order-id 'before))
    )
  ] 

  (use coin)
  (use webauthn-wallet)
  (defconst NS_KEYSET:string (read-string 'webauthn-keyset-name))

  (defcap GOVERNANCE ()
    (enforce-keyset NS_KEYSET))

  (defconst CREATED 'CREATED)
  (defconst READY_FOR_DELIVERY 'READY_FOR_DELIVERY)
	(defconst IN_TRANSIT 'IN_TRANSIT)
  (defconst DELIVERED 'DELIVERED)

  (defconst ESCROW_ID (create-principal (create-capability-guard (ESCROW))))

  (defconst MINIMUM_PRECISION coin.MINIMUM_PRECISION
    "Minimum allowed precision for coin transactions"
  )

  (defschema order-schema
    @doc "Order table schema"
    @model [
      (invariant (>= order-price 0.0))
      (invariant (>= delivery-price 0.0))
      (invariant
        (or (= CREATED order-status)
        (or (= READY_FOR_DELIVERY order-status)
        (or (= IN_TRANSIT order-status)
            (= DELIVERED order-status)))))
    ]
    order-status   : string
    merchant       : string
    merchant-guard : guard
    buyer          : string
    buyer-guard    : guard
    order-price    : decimal
    delivery-price : decimal
  )

	(deftable order-table:{order-schema})

  (defschema delivery-schema
    @doc "Delivery table schema - the id has an implicit relation to the order itself"
    courier       : string
	  courier-guard : guard
  )

  (deftable delivery-table:{delivery-schema})

  (defcap BUYER (order-id:string)
    @doc "Capability that validates if action is done by buyer (customer)"
    (with-read order-table order-id
      { 'buyer       := buyer
      , 'buyer-guard := buyer-guard 
      }
      (enforce-capability-guard buyer buyer-guard)
    )
  )

  (defcap MERCHANT (order-id:string)
    @doc "Capability that validates if action is done by merchant"
    (with-read order-table order-id
      { 'merchant       := merchant
      , 'merchant-guard := merchant-guard }
      (enforce-capability-guard merchant merchant-guard)
    )
  )

  (defcap COURIER (order-id:string)
    @doc "Capability that validates if action is done by courier (delivery party)"
    (with-read delivery-table order-id
      { 'courier       := courier
      , 'courier-guard := courier-guard }
      (enforce-capability-guard courier courier-guard)
    )
  )

  (defcap CREATE_ORDER (order-id:string)
    @doc "Capability validates that both merchant and buyer should sign an order"
    @event
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (RESERVE_FUNDS))
  )

  (defcap PURCHASE_ORDER_ITEM (
    order-id: string
    line-id:string
    price: decimal
  )
    @doc "Capability validates that the buyer wants to purchase this item as part of the order"
    true
  )

  (defcap SELL_ORDER_ITEM (
    order-id: string
    line-id:string
    price: decimal
  )
    @doc "Capability validates that the seller wants to sell this item as part of the order"
    true
  )

  (defcap SET_READY_FOR_DELIVERY(order-id:string)
    @doc "Capability validates that the order is ready for delivery"
    @event
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (MERCHANT order-id))
  )

  (defcap HANDOFF_DELIVERY (order-id:string)
    @doc "Capability validates that the merchant has signed for the pickup"
    @event
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (MERCHANT order-id))
  )

  (defcap PICKUP_DELIVERY (order-id:string)
    @doc "Capability validates that the courier has signed for the pickup"
    @event
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (RESERVE_FUNDS))
  )

  (defcap ORDER_PICKUP (order-id:string)
    (compose-capability(HANDOFF_DELIVERY order-id))
    (compose-capability(PICKUP_DELIVERY order-id))
  )

  (defcap DELIVER_ORDER (order-id:string)
    @doc "Capability validates that the courier should sign for the delivery"
    @event
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (COURIER order-id))
    (compose-capability (ESCROW))
  )

  (defcap RECEIVE_ORDER (order-id:string)
    @doc "Capability validates that the buyer should sign for the delivery"
    @event
    (compose-capability (UPDATE_ORDER_STATUS))
    (compose-capability (BUYER order-id))
    (compose-capability (ESCROW))
  )

  (defcap ORDER_DELIVERY(order-id:string)
    (compose-capability(DELIVER_ORDER order-id))
    (compose-capability(RECEIVE_ORDER order-id))
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

  (defun enforce-capability-guard (account:string guard:guard)
    (enforce (validate-principal guard account) "Invalid guard for the account")
    (enforce-one "Neither keyset or capability guard passed" [
      (enforce-guard guard)
      (webauthn-wallet.enforce-authenticated account)
    ])
  )

  (defschema order-line-schema
    @doc "Order line schema"
    line-id  : string
    price    : decimal
  )

  (defun enforce-and-get-price:decimal (
    order-id                   : string
    buyer                      : string
    buyer-guard                : guard
    merchant                   : string
    merchant-guard             : guard
    line                       : object{order-line-schema}
  )
    (bind line
      { 'line-id := line-id
      , 'price   := price
      }

      (with-capability (PURCHASE_ORDER_ITEM order-id line-id price)
        (enforce-capability-guard buyer buyer-guard)
      )

      (with-capability (SELL_ORDER_ITEM order-id line-id price)
        (enforce-capability-guard merchant merchant-guard)
      )

      price
    )
  )
  
  (defun enforce-order-lines (
    order-id       : string
    order-lines    : [object{order-line-schema}]
    buyer          : string
    buyer-guard    : guard
    merchant       : string
    merchant-guard : guard
    order-price    : decimal
    delivery-price : decimal
  )
    (let (
      (total-price
        (fold
          (+)
          0.0
          (map
            (enforce-and-get-price
              order-id
              buyer
              buyer-guard
              merchant
              merchant-guard
            )
            order-lines
          )
        )
      )
    )
      (enforce
        (= total-price (+ order-price delivery-price)) 
        (format "Order lines total price does not match the order price with delivery price {} {}" [order-price total-price])
      )
      (enforce (= (floor order-price MINIMUM_PRECISION) order-price) "Order price exeeds minimum allowed precision decimals")
      (enforce (= (floor delivery-price MINIMUM_PRECISION) delivery-price) "Delivery price exeeds minimum allowed precision decimals")
    )
  )
  (defun create-order (
    order-id       : string
    order-lines    : [object{order-line-schema}]
    merchant       : string
    merchant-guard : guard
    buyer          : string
    buyer-guard    : guard
    order-price    : decimal
    delivery-price : decimal
  )
    @doc "Creates an order in the order table and reserves funds to the escrow account"
    (enforce (!= order-id "") "Order id can not be empty")
    (enforce (< 0.0 order-price) "Order price is not a positive number")
    (enforce (< 0.0 delivery-price) "Delivery price is not a positive number")

    (enforce (validate-principal merchant-guard merchant) "Invalid merchant guard")
    (enforce (validate-principal buyer-guard buyer) "Invalid buyer guard")

    (with-capability (CREATE_ORDER order-id)
      (enforce-order-lines
        order-id
        order-lines
        buyer
        buyer-guard
        merchant
        merchant-guard
        order-price
        delivery-price
      )
      (insert order-table order-id 
        { 'order-status   : CREATED
        , 'merchant       : merchant
        , 'merchant-guard : merchant-guard
        , 'buyer          : buyer
        , 'buyer-guard    : buyer-guard
        , 'order-price    : order-price
        , 'delivery-price : delivery-price
        }
      )
      (reserve-funds order-id buyer (+ order-price delivery-price))
      (reserve-funds order-id merchant (get-merchant-deposit-amount order-price))
    )
  )

  (defun get-order(order-id:string)
    (with-default-read delivery-table order-id
      { 'courier  : "No courier assigned" }
      { 'courier  := courier }
      { 'order-id : order-id
      , 'order    : (read order-table order-id)
      , 'courier  : courier
      }
    )
  )

  (defun get-order-status(order-id:string)
    (with-read order-table order-id
    { 'order-status := order-status }
    order-status))

  (defun update-order-status(order-id:string order-status:string)
    @model [
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
      order-price
    )
  )

  (defun set-order-ready-for-delivery(order-id:string)
    @doc "Allow the merchant to mark the product ready for delivery"
    (with-capability (SET_READY_FOR_DELIVERY order-id)
      (update-order-status order-id READY_FOR_DELIVERY)))

  (defun get-courier-deposit-amount:decimal (order-price:decimal)
    @doc "Calculate the courier deposit (stake) - equal to 2 times order price"
    (* 2.0 order-price))

  (defun get-merchant-deposit-amount:decimal (order-price:decimal)
    @doc "Calculate the amount of the merchant's deposit (stake) - equal to the order price"
    order-price)

  (defun reserve-funds (order-id:string sender:string amount:decimal)
    (require-capability (RESERVE_FUNDS))
    (enforce (!= order-id "") "Order id can not be empty")
    (enforce (is-principal sender) "Sender can not be empty")
    (webauthn-wallet.transfer sender ESCROW_ID amount)
  )

  (defun pickup-delivery(order-id:string courier:string courier-guard:guard)
    @model [
      (property (= READY_FOR_DELIVERY (current-order-status order-id)))
      (property (= IN_TRANSIT (current-order-status-after order-id)))
    ]
    (with-capability (ORDER_PICKUP order-id)
      (with-read order-table order-id
        { 'order-status := order-status
        , 'order-price  := order-price }
        (enforce (= order-status READY_FOR_DELIVERY) "Order status is not READY_FOR_DELIVERY")
        (reserve-funds order-id courier (get-courier-deposit-amount order-price))
        (update-order-status order-id IN_TRANSIT)
        (enforce-capability-guard courier courier-guard)
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
      (property (= IN_TRANSIT (current-order-status order-id)))
      (property (= DELIVERED (current-order-status-after order-id)))
    ]

    (with-capability (ORDER_DELIVERY order-id) 
      (with-read order-table order-id
        { 'merchant       := merchant
        , 'order-price    := order-price
        , 'delivery-price := delivery-price
        }
        (with-read delivery-table order-id
          { 'courier := courier }
          (let* (
            (courier-deposit (get-courier-deposit-amount order-price))
            (merchant-deposit (get-merchant-deposit-amount order-price))
            (courier-payout (+ courier-deposit delivery-price))
            (merchant-payout (+ merchant-deposit order-price))
          )
            (install-capability (coin.TRANSFER ESCROW_ID courier courier-payout))
            (coin.transfer ESCROW_ID courier courier-payout)
            (install-capability (coin.TRANSFER ESCROW_ID merchant merchant-payout))
            (coin.transfer ESCROW_ID merchant merchant-payout)
            (update-order-status order-id DELIVERED)
          )
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
    (coin.create-account delivery.ESCROW_ID (create-capability-guard (delivery.ESCROW)))
  ]
)
