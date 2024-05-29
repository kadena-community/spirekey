(namespace (ns.create-principal-namespace (read-keyset 'l2-keyset )))

(module l2 GOVERNANCE
  @model [
    (defproperty is-unit(amount:decimal)
      (and (> amount 0.0)
           (= (floor amount MINIMUM_PRECISION) amount)
      )
    )
  ]
  (use coin)

  (implements fungible-v2)
  (implements fungible-xchain-v1)

  (defconst NS_HASH (ns.create-principal-namespace (read-keyset 'l2-keyset)))
  (defconst L2_KS_NAME (format "{}.{}" [NS_HASH 'l2-keyset]))

  (defconst L1 (read-string 'l1)
    "This L2 contract is bound to 1 specific L1 chain"
  )
  (defconst ESCROW_ID
    (create-principal
      (create-capability-guard (ESCROW_MANAGEMENT))
    )
    "The escrow will hold all KDA in circulation on the L2"
  )

  (defconst MINIMUM_PRECISION coin.MINIMUM_PRECISION
    "Minimum allowed precision for coin transactions"
  )

  (defcap GOVERNANCE()
    @doc "In this PoC the governance keyset, which can be a multisig, needs to sign for continuation requests"
    (enforce-guard L2_KS_NAME)
  )

  (defcap ESCROW_MANAGEMENT()
    @doc "This magic capability makes sure that the escrow can only be called from within this contract"
    true
  )

  (defcap LOCK_DEPOSIT(sender:string)
    (enforce (is-principal sender) "Sender must be a principal account")
  )

  (defcap WITHDRAW(sender:string)
    (enforce (is-principal sender) "Sender must be a principal account")
    (compose-capability (L2_DEBIT sender))
  )

  (defcap CLAIM_WITHDRAWAL()
    @doc "This capability is used to claim a withdrawal from L2 -> L1"
    (compose-capability (GOVERNANCE))
    (compose-capability (ESCROW_MANAGEMENT))
  )

  (defcap L2_DEBIT(sender:string)
    (enforce-guard (at 'guard (read l2-coin-table sender)))
    (enforce (is-principal sender) "Sender must be a principal account")
  )

  (defcap L2_CREDIT(receiver:string)
    (enforce (is-principal receiver) "Receiver must be a principal account")
  )

  (defcap TRANSFER:bool(sender:string receiver:string amount:decimal)
    @doc "This capability is used to transfer KDA from one L2 account to another"
    @managed amount TRANSFER-mgr
    (compose-capability (L2_DEBIT sender))
    (compose-capability (L2_CREDIT receiver))
  )

  (defun TRANSFER-mgr:decimal(managed:decimal requested:decimal)
    @model [
      (property (>= managed requested))
    ]
    (enforce (>= managed requested)
      (format "TRANSFER(L2) exceeded for balance {}" [managed])
    )
    (- managed requested)
  )

  (defcap TRANSFER_XCHAIN:bool(sender:string receiver:string amount:decimal target-chain:string)
    @doc "This capability is used to transfer KDA from one L2 account to another on a different chain"
    @managed amount TRANSFER_XCHAIN-mgr
    (compose-capability (L2_DEBIT sender))
    (compose-capability (L2_CREDIT receiver))
  )

  (defun TRANSFER_XCHAIN-mgr:decimal(managed:decimal requested:decimal)
    @model [
      (property (>= managed requested))
    ]
    (enforce (>= managed requested)
      (format "TRANSFER(L2) exceeded for balance {}" [managed])
    )
    (- managed requested)
  )

  (defcap TRANSFER_XCHAIN_RECD:bool
    ( sender:string
      receiver:string
      amount:decimal
      source-chain:string
    )
    @event true
  )

  (defschema l2-coin
    @doc "Schema for L2 coin balances, representing the coin that is locked on L1"
    @model [
      (invariant (>= balance 0.0))
      (invariant (= (floor balance MINIMUM_PRECISION) balance))
    ]
    balance : decimal
    guard   : guard
  )
  (deftable l2-coin-table:{l2-coin})

  (defschema deposit-schema
    @doc "Schema for depositing from L1 -> L2"
    @model [
      (invariant (>= balance 0.0))
      (invariant (= (floor balance MINIMUM_PRECISION) balance))
      (invariant (is-principal receiver))
    ]
    receiver     : string
    amount       : decimal
    guard        : guard
  )
  (defschema withdraw-schema
    @doc "Schema for withdrawing from L2 -> L1"
    @model [
      (invariant (>= balance 0.0))
      (invariant (= (floor balance MINIMUM_PRECISION) balance))
      (invariant (is-principal receiver))
    ]
    receiver     : string
    amount       : decimal
  )

  ;;;;;;;;;;;
  ; DEPOSIT ;
  ;;;;;;;;;;;
  (defpact deposit(sender:string receiver:string guard:guard amount:decimal)
    @doc "Deposit KDA from L1 to L2"
    @model [
      (property (is-unit amount))
      (property (is-principal sender))
      (property (is-principal receiver))
    ]
    (step
      (with-capability (LOCK_DEPOSIT sender)
        (let ((deposit-details:object{deposit-schema}
            { 'receiver : receiver
            , 'amount   : amount
            , 'guard    : guard
            }
          ))
          (lock-deposit sender amount)
          (enforce (validate-principal guard receiver) "Guard must be a principal")
          (yield deposit-details "crossnet:L2.2")
        )
      )
    )

    (step
      (resume
        { 'receiver := receiver
        , 'amount   := amount
        , 'guard    := guard
        }
        (claim-deposit receiver guard amount)
      )
    )
  )

  (defun lock-deposit(sender:string amount:decimal)
    @doc "@INTERNAL ONLY - Lock the tokens on L1, so they can be minted on L2"
    @model [
      (property (is-unit amount))
      (property (is-principal sender))
      (property (= (- amount) (cell-delta coin-table 'balance sender)))
      (property (= amount (cell-delta coin-table 'balance ESCROW_ID)))
    ]
    (require-capability (LOCK_DEPOSIT sender))
    (enforce (= L1 (at 'chain-id (chain-data))) "Must be called from L1")
    (enforce (is-principal sender) "Sender must be a principal account")
    (coin.transfer sender ESCROW_ID amount)
  )

  (defun claim-deposit(receiver:string guard:guard amount:decimal)
    @doc "@INTERNAL ONLY - Mint the tokens on L2"
    @model [
      (property (is-unit amount))
      ; (property (authorized-by L2_KS_NAME))
      ; this is not supported by FV, it doesn't resolve L2_KS_NAME
      ; (Latest master does support this now, but not yet in the L2 branch)
      (property (authorized-by "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2-keyset"))
      (property (= amount (cell-delta l2-coin-table 'balance receiver)))
      (property (is-principal receiver))
      (property (when (row-exists l2-coin-table receiver 'before)
        (= (at 'guard (read l2-coin-table receiver 'before)) guard)
      ))
    ]
    (with-capability (GOVERNANCE)
      (with-default-read l2-coin-table receiver
        { 'balance : 0.0
        , 'guard   : guard
        }
        { 'balance := receiver-balance
        , 'guard   := receiver-guard
        }
        (enforce-unit amount)
        (enforce (> amount 0.0) "Amount must be non-negative")
        (enforce (= receiver-guard guard) "Guard must match")
        (enforce (validate-principal guard receiver) "Guard must be a principal")
        (write l2-coin-table receiver
          { 'balance : (+ receiver-balance amount)
          , 'guard   : receiver-guard
          }
        )
      )
    )
  )

  ;;;;;;;;;;;;
  ; WITHDRAW ;
  ;;;;;;;;;;;;
  (defpact withdraw(sender:string receiver:string amount:decimal)
    @doc "Withdraw KDA from L2 to L1"
    @model [
      (property (is-unit amount))
      (property (is-principal sender))
      (property (is-principal receiver))
    ]
    (step
      (with-capability (WITHDRAW sender)
        (let ((withdraw-details:object{withdraw-schema}
            { 'receiver : receiver
            , 'amount   : amount
            }
          ))
          (burn-withdraw sender amount)
          (enforce (is-principal receiver) "Receiver must be a principal account")
          (yield withdraw-details "crossnet:L2.2")
        )
      )
    )

    (step
      (resume
        { 'receiver := receiver
        , 'amount   := amount
        }
        (with-capability (CLAIM_WITHDRAWAL)
          (claim-withdraw receiver amount)
        )
      )
    )
  )
  (defun burn-withdraw(sender:string amount:decimal)
    @doc "@INTERNAL ONLY - Burn the tokens on L2, so they can be withdrawn on L1"
    @model [
      (property (is-unit amount))
      (property (is-principal sender))
      (property (row-enforced l2-coin-table 'guard sender))
      (property (= (- amount) (cell-delta l2-coin-table 'balance sender)))
    ]
    (require-capability (L2_DEBIT sender))
    (with-read l2-coin-table sender
      { 'balance := sender-balance
      , 'guard   := sender-guard
      }
      (enforce-unit amount)
      (enforce (> amount 0.0) "Amount must be positive")
      (enforce (>= sender-balance amount) "Sender does not have enough funds")
      (enforce (is-principal sender) "Sender must be a principal account")
      (enforce-guard sender-guard)
      (update l2-coin-table sender
        { 'balance : (- sender-balance amount) }
      )
    )
  )

  (defun claim-withdraw(receiver:string amount:decimal)
    @doc "@INTERNAL ONLY - Withdraw KDA from the escrow account on L1"
    @model [
      (property (is-unit amount))
      (property (is-principal receiver))
      ; (property (authorized-by L2_KS_NAME))
      ; this is not supported by FV, it doesn't resolve L2_KS_NAME
      ; (Latest master does support this now, but not yet in the L2 branch)
      (property (authorized-by "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.l2-keyset"))
    ]
    (require-capability (ESCROW_MANAGEMENT))
    (with-capability (GOVERNANCE)
      (enforce (= L1 (at 'chain-id (chain-data))) "Must be called from L1")
      (enforce (is-principal receiver) "Receiver must be a principal account")
      (install-capability (coin.TRANSFER ESCROW_ID receiver amount))
      (coin.transfer ESCROW_ID receiver amount)
    )
  )

  ;;;;;;;;;;;;
  ; TRANSFER ;
  ;;;;;;;;;;;;
  (defun transfer:string(sender:string receiver:string amount:decimal)
    @doc "Transfer KDA from one L2 account to another"
    @model [
      (property (is-unit amount))
      (property (!= sender receiver))
      (property (row-enforced l2-coin-table 'guard sender))
      (property (is-principal sender))
      (property (is-principal receiver))
      (property (= (- amount) (cell-delta l2-coin-table 'balance sender)))
      (property (= amount (cell-delta l2-coin-table 'balance receiver)))
    ]
    (with-capability (TRANSFER sender receiver amount)
      (enforce (!= sender receiver) "Sender and receiver must be different")
      (l2-debit sender amount)
      (l2-credit receiver amount)
    )
  )

  (defun l2-debit(sender:string amount:decimal)
    @doc "@INTERNAL ONLY - Debit KDA from an L2 account"
    @model [
      (property (is-unit amount))
      (property (row-enforced l2-coin-table 'guard sender))
      (property (is-principal sender))
      (property (= (- amount) (cell-delta l2-coin-table 'balance sender)))
    ]
    (require-capability (L2_DEBIT sender))
    (with-read l2-coin-table sender
      { 'balance := sender-balance
      , 'guard   := sender-guard
      }
      (enforce-unit amount)
      (enforce (> amount 0.0) "Amount must be positive")
      (enforce (>= sender-balance amount) "Sender does not have enough funds")
      (enforce (is-principal sender) "Sender must be a principal account")
      (enforce-guard sender-guard)
      (update l2-coin-table sender
        { 'balance : (- sender-balance amount) }
      )
    )
  )

  (defun l2-credit:string(receiver:string amount:decimal)
    @doc "@INTERNAL ONLY - Credit KDA to an L2 account"
    @model [
      (property (is-unit amount))
      (property (is-principal receiver))
      (property (= amount (cell-delta l2-coin-table 'balance receiver)))
    ]
    (require-capability (L2_CREDIT receiver))
    (with-read l2-coin-table receiver
      { 'balance := receiver-balance
      , 'guard   := receiver-guard
      }
      (enforce-unit amount)
      (enforce (> amount 0.0) "Amount must be positive")
      (enforce (is-principal receiver) "Receiver must be a principal account")
      (update l2-coin-table receiver
        { 'balance : (+ receiver-balance amount) }
      )
    )
  )

  (defun get-balance:decimal(account:string)
    @doc "Get the balance of an L2 account"
    (with-read l2-coin-table account
      { 'balance := account-balance }
      account-balance
    )
  )

  (defun details:object{fungible-v2.account-details}(account:string)
    @doc "Get the details of an L2 account"
    (with-read l2-coin-table account
      { 'balance := account-balance
      , 'guard   := account-guard
      }
      { 'account : account
      , 'balance : account-balance
      , 'guard   : account-guard
      }
    )
  )

  (defun create-account:string(account:string guard:guard)
    @doc "Create a new L2 account"
    @model [
      (property (is-principal account))
    ]
    (enforce (validate-principal guard account) "Guard must be a principal")
    (insert l2-coin-table account
      { 'balance : 0.0
      , 'guard   : guard
      }
    )
  )

  (defun transfer-create:string(sender:string receiver:string receiver-guard:guard amount:decimal)
    @doc "Transfer KDA from one L2 account to another, creating the receiver if it does not exist"
    @model [
      (property (is-unit amount))
      (property (!= sender receiver))
      (property (is-principal sender))
      (property (is-principal receiver))
    ]
    (enforce (validate-principal receiver-guard receiver) "Guard must be a principal")
    (with-capability (TRANSFER sender receiver amount)
      (enforce (!= sender receiver) "Sender and receiver must be different")
      (with-default-read l2-coin-table receiver
        { 'balance : 0.0
        , 'guard   : receiver-guard
        }
        { 'balance := receiver-balance
        , 'guard   := receiver-guard
        }
        (enforce (is-principal receiver) "Receiver must be a principal account")
        (enforce-guard receiver-guard)
        (l2-debit sender amount)
        (l2-credit receiver amount)
      )
    )
  )

  ;;;;;;;;;;;;;;;;;;;;;;;;;
  ; Fungible V2 interface ;
  ;;;;;;;;;;;;;;;;;;;;;;;;;
  (defun rotate:string(account:string new-guard:guard)
    (enforce false "Accounts should all be principalled, therefore rotation is not supported")
    "This function is not supported"
  )

  (defpact transfer-crosschain:string(
    sender:string
    receiver:string
    receiver-guard:guard
    target-chain:string
    amount:decimal
  )
    @model [
      (property (is-unit amount))
      (property (is-principal sender))
      (property (is-principal receiver))
    ]
    (step
      (with-capability (TRANSFER_XCHAIN sender receiver amount target-chain)
        (let
          ((crosschain-details:object{coin.crosschain-schema}
            { 'receiver       : receiver
            , 'receiver-guard : receiver-guard
            , 'amount         : amount
            , 'source-chain   : (at 'chain-id (chain-data))
            }
          ))
          (enforce (validate-principal receiver-guard receiver) "Guard must be a principal")
          (enforce (!= target-chain "") "Target chain must be specified")
          (l2-debit sender amount)
          (yield crosschain-details target-chain)
        )
      )
    )

    (step
      (resume
        { 'receiver       := receiver
        , 'receiver-guard := receiver-guard
        , 'amount         := amount
        , 'source-chain   := source-chain
        }
        (with-capability (GOVERNANCE)
          (with-capability (L2_CREDIT receiver)
            (l2-credit receiver amount)
          )
        )
      )
    )
  )

  (defun precision:integer() MINIMUM_PRECISION)

  (defun enforce-unit:bool(amount:decimal)
    (coin.enforce-unit amount)
  )
)

(if (read-msg 'upgrade)
  ["Upgrade successful"]
  [
    (create-table l2-coin-table)
    ; Prepare the creation of the escrow account
    (coin.create-account l2.ESCROW_ID (create-capability-guard (l2.ESCROW_MANAGEMENT)))
    ; Define the keyset for the L2 contract and make sure we have access to it
    (define-keyset l2.L2_KS_NAME (read-keyset 'l2-keyset))
    (enforce-guard l2.L2_KS_NAME)
  ]
)
