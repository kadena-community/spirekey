(define-namespace
  (ns.create-principal-namespace (read-keyset 'l2-keyset))
  (read-keyset 'l2-keyset )
  (read-keyset 'l2-keyset ))

(namespace (ns.create-principal-namespace (read-keyset 'l2-keyset )))

; Add a keyset for withdraw
(module l2 GOVERNANCE
  @doc "Smart Contract governing the l2 transactions"

  (use coin)

  (implements fungible-v2)
  (implements fungible-xchain-v1)

  (defconst NS_HASH (ns.create-principal-namespace (read-keyset 'l2-keyset)))
  (defconst L2_KS_NAME (format "{}.{}" [NS_HASH 'l2-keyset]))

  ; Only allow chain 14 <-> L2
  ; I choose chain 14 because it's currently least used for tests
  (defconst L1 "14")

  (defconst MINIMUM_PRECISION 12
    "Minimum allowed precision for coin transactions")

  (defcap GOVERNANCE ()
    (enforce-keyset L2_KS_NAME))

  (defcap INTERNAL ()
    @doc "Internal capabilities"
    true)

  (defcap CREDIT:bool(receiver:string)
    (enforce (!= receiver "") "Receiver must be non-empty"))

  (defcap DEBIT (sender:string)
    (enforce-guard (at 'guard (read accounts (get-id sender))))
    (enforce (!= sender "") "Sender must be non-empty"))

  (defcap SYNC ()
    @doc "Sync capabilities"
    true)

  (defcap TRANSFER:bool
    ( sender:string
      receiver:string
      amount:decimal
    )
    @managed amount TRANSFER-mgr
    (enforce (!= sender receiver) "same sender and receiver")
    (enforce-unit amount)
    (enforce (> amount 0.0) "Positive amount")
    (compose-capability (DEBIT sender))
    (compose-capability (CREDIT receiver)))

  (defcap WITHDRAW:bool(sender:string receiver:string amount:decimal)
    (enforce-unit amount)
    (enforce (> amount 0.0) "Positive amount")
    (compose-capability (DEBIT sender))
    (compose-capability (CREDIT receiver)))

  (defun TRANSFER-mgr:decimal
    ( managed:decimal
      requested:decimal
    )

    (let ((newbal (- managed requested)))
      (enforce (>= newbal 0.0)
        (format "TRANSFER(L2) exceeded for balance {}" [managed]))
      newbal))

  (defun sync-guard()
    (require-capability (SYNC)))

  (defun create-sync-guard:guard ()
    @doc "Guard for syncing"
    (create-user-guard (sync-guard)))

  (defun get-escrow-id()
    (create-principal (create-sync-guard)))

  (defschema account
    @doc "Account schema holding the balance of an L2 account.\
         \The balance on the L1 is stored in the coin contract."
    @model
      [(invariant (>= balance 0.0))]
    balance    : decimal
    guard      : guard)
  (deftable accounts:{account})

  (defun debit-l1(sender:string amount:decimal)
    @doc "Transfer KDA from coin to an escrow account"
    @model
      [(property (>= amount 0.0))]
    (require-capability (SYNC))
    (enforce-unit amount)
    (enforce (>= amount 0.0) "Amount must be positive")
    (coin.transfer-create sender (create-principal (create-sync-guard)) (create-sync-guard) amount))

  (defun get-id(id:string)
    @model
      [(property (!= id ""))]
    (enforce (!= id "") "Id must be non-empty"))

  (defun credit-l2(receiver:string amount:decimal)
    @model
      [(property (>= amount 0.0))]
    (require-capability (CREDIT receiver))
    (with-read accounts (get-id receiver)
      { "balance" := balance }
      (enforce (> amount 0.0) "Amount must be positive")
      (enforce (>= balance 0.0) "Balance must be positive")
      (enforce-unit amount)
      (enforce-unit balance)
      (update accounts (get-id receiver)
        { "balance" : (+ balance amount) })))

  (defun credit-l2-safe(receiver:string guard:guard amount:decimal)
    @doc "Credit an L2 account"
    @model
      [(property (>= amount 0.0))]
    (require-capability (CREDIT receiver))
    (enforce (>= amount 0.0) "Amount must be positive")
    (with-default-read accounts (get-id receiver)
      { "balance"    : 0.0
      , "guard"      : guard
      }
      { "balance"    := balance
      , "guard"      := old-guard
      }
      (enforce (= old-guard guard) "Guard must match")
      (enforce-unit amount)
      (enforce-unit balance)
      (enforce (>= balance 0.0) "Balance must be positive")
      (write accounts (get-id receiver)
        { "balance"    : (+ balance amount)
        , "guard"      : guard
        })))

  (defun debit-l2(sender:string amount:decimal)
    @doc "Debit an L2 account"
    @model
      [(property (>= amount 0.0))]
    (require-capability (DEBIT sender))
    (enforce-unit amount)
    (enforce (>= amount 0.0) "Amount must be positive")
    (with-read accounts (get-id sender)
      { "balance":= balance }
      (enforce (>= balance amount) "Insufficient funds")
      (enforce-unit balance)
      (update accounts (get-id sender)
        { "balance": (- balance amount) })))

  (defschema cross-layer-schema
    @doc "Schema for transfering from L1 -> L2"
    @model
      [(invariant (>= amount 0.0))]
    account      : string
    amount       : decimal
    guard        : guard
    source-chain : string)

  (defpact deposit:string(from:string to:string to-guard:guard amount:decimal)
    @doc "Deposit funds from L1 -> L2"
    @model
      [(property (>= amount 0.0))]

    (step
      (let ((chain-id (at 'chain-id (chain-data))))
        (enforce (= chain-id L1) "Must be called from L1")

        (with-capability (SYNC)
          (with-capability (CREDIT to)
            (debit-l1 from amount)
            (let ((cross-layer-details:object{cross-layer-schema}
              { "account"      : to
              , "amount"       : amount
              , "guard"        : to-guard
              , "source-chain" : chain-id
              }))
              (yield cross-layer-details "crossnet:L2.2"))))))

    (step
      (resume
        { "account"      := account
        , "amount"       := amount
        , "guard"        := from-guard
        , "source-chain" := source-chain
        }
        (let ((chain-id (at 'chain-id (chain-data))))
          ; must disable till the chain is actually called `crossnet:L2`
          ; (enforce (= chain-id "crossnet:L2") "Must be called from L2")
          (with-capability (CREDIT account)
            (credit-l2-safe account from-guard amount))))))

  (defun transfer:string(sender:string receiver:string amount:decimal)
    @doc "Transfer from L2 -> L2"
    (enforce (>= amount 0.0) "Amount must be positive")
    (with-capability (TRANSFER sender receiver amount)
      (debit-l2 sender amount)
      (credit-l2 receiver amount)))

  (defpact withdraw:string(account:string to:string amount:decimal)
    @doc "Transfer from L2 -> L1"

    (step
      (with-capability (WITHDRAW account to amount)
        (with-read accounts (get-id account)
          { "guard"   := guard
          , "balance" := balance }
          (enforce (>= balance amount) "Insufficient funds")
          (enforce (> amount 0.0) "Amount must be positive")
          (debit-l2 account amount)
          (let ((cross-layer-details:object{cross-layer-schema}
            { "account"      : to
            , "amount"       : amount
            , "guard"        : guard
            , "source-chain" : (at 'chain-id (chain-data))
            }))
            (yield cross-layer-details "crossnet:L1.2")))))

    (step
      (resume
        { "account"      := account
        , "amount"       := amount
        , "guard"        := guard
        , "source-chain" := source-chain
        }
        (with-capability (SYNC)
          (with-capability (CREDIT account)
            (with-capability (GOVERNANCE)
              (withdraw-from-escrow account amount)))))))

  (defun withdraw-from-escrow(receiver:string amount:decimal)
    @model
      [(property (>= amount 0.0))
       (property (!= receiver ""))]
    (require-capability (SYNC))
    (enforce (>= amount 0.0) "Amount must be positive")
    (enforce (!= receiver "") "Invalid receiver")
    (let ((id:string (get-escrow-id)))
      (install-capability (coin.TRANSFER id receiver amount))
      (coin.transfer id receiver amount)))

  (defun details:object{fungible-v2.account-details}(account:string)
    (with-read accounts (get-id account)
      { "balance"    := balance
      , "guard"      := guard
      }
      { "account"    : account
      , "balance"    : balance
      , "guard"      : guard
      }))

  (defun rotate:string(account:string new-guard:guard)
    (let ((id (get-id account)))
      (with-read accounts id
        { "balance" := balance
        , "guard"   := old-guard
        }
        (enforce-guard old-guard)
        (enforce (!= old-guard new-guard) "New guard must be different")
        (update accounts id
          { "guard" : new-guard }))))

  (defpact transfer-crosschain:string
    ( sender         : string
      receiver       : string
      receiver-guard : guard
      target-chain   : string
      amount         : decimal
    )
    @model [ (property (> amount 0.0))
             (property (!= sender ""))
             (property (!= receiver ""))]
    (step
      (with-capability(SYNC)
        (enforce (!= sender "") "Invalid sender")
        (enforce (!= receiver "") "Invalid receiver")
        (enforce (!= target-chain "") "Invalid target-chain")
        (enforce (> amount 0.0) "Amount must be positive")
        (enforce-unit amount)
        "Not implemented")))

  (defun get-balance:decimal(account:string)
    (with-read accounts (get-id account)
      { "balance" := balance }
      balance))

  (defun transfer-create:string(sender:string receiver:string receiver-guard:guard amount:decimal)
    @doc "Transfer from L2 -> L2"
    (enforce (>= amount 0.0) "Amount must be positive")
    (with-capability (TRANSFER sender receiver amount)
      (debit-l2 sender amount)
      ; TODO - refactor this to create an account if receiver did not exist
      (credit-l2 receiver amount)))

  (defun precision:integer()
    MINIMUM_PRECISION)

  (defun create-account:string(account:string guard:guard)
    ; TODO - add some checks
    (insert accounts (get-id account)
      { "balance" : 0.0
      , "guard"   : guard }))

  (defun enforce-unit:bool (amount:decimal)
    @doc "Enforce minimum precision allowed for coin transactions"

    (coin.enforce-unit amount))

  (defcap TRANSFER_XCHAIN:bool
    ( sender:string
      receiver:string
      amount:decimal
      target-chain:string
    )

    @managed amount TRANSFER_XCHAIN-mgr
    (enforce-unit amount)
    (enforce (> amount 0.0) "Cross-chain transfers require a positive amount")
    (compose-capability (DEBIT sender))
  )

  (defun TRANSFER_XCHAIN-mgr:decimal
    ( managed:decimal
      requested:decimal
    )

    (enforce (>= managed requested)
      (format "TRANSFER_XCHAIN exceeded for balance {}" [managed]))
    0.0
  )

  (defcap TRANSFER_XCHAIN_RECD:bool
    ( sender:string
      receiver:string
      amount:decimal
      source-chain:string
    )
    @event true
  )
)

(define-keyset
  l2.L2_KS_NAME
  (read-keyset 'l2-keyset))

; Make sure that our pre-determined ns_hash has not been changed
(enforce-keyset l2.L2_KS_NAME)

(if (read-msg 'upgrade)
  ["Upgrade successful"]
  [(create-table accounts)])
