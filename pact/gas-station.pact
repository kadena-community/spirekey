(namespace (read-msg 'ns))

(module gas-station GOVERNANCE
  (implements gas-payer-v1)
  (use coin)

  (defconst NS_HASH:string "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9")
  (defconst NS_KEYSET:guard (keyset-ref-guard (format "{}.{}" [NS_HASH "l2-keyset"])))
  (defconst GAS_STATION_GUARD:guard
    (guard-any
          [
            (create-gas-payer-guard)
            NS_KEYSET
          ]))
  (defconst GAS_STATION:string (create-principal GAS_STATION_GUARD))

  (defcap GOVERNANCE ()
    (enforce-guard NS_KEYSET))

  (defschema gas
    balance:decimal
    guard:guard)

  (deftable ledger:{gas})

  (defcap GAS_PAYER:bool
    ( user:string
      limit:integer
      price:decimal
    )
    ; (enforce (= "exec" (at "tx-type" (read-msg))) "Inside an exec")
    ; (enforce (= 1 (length (at "exec-code" (read-msg)))) "Tx of only one pact function")
    ; (enforce
    ;   (= (format "({}." [NS_HASH])
    ;      (take 44 (at 0 (at "exec-code" (read-msg)))))
    ;   "only n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9 namespace is payed for")
    (enforce-below-or-at-gas-price 0.0000001)
    (compose-capability (ALLOW_GAS))
  )
  ; UTIL FUNCTIONS extracted so no additional deploy is necessary
  (defun enforce-below-or-at-gas-price:bool (gasPrice:decimal)
    (enforce
      (<= (chain-gas-price) gasPrice)
      (format "Gas Price must be smaller than or equal to {}" [gasPrice])))

  (defun guard-any:guard (guards:[guard])
    "Create a guard that succeeds if at least one guard in GUARDS is successfully enforced."
    (enforce (< 0 (length guards)) "Guard list cannot be empty")
    (create-user-guard (enforce-guard-any guards)))

  (defun enforce-guard-any:bool (guards:[guard])
    "Will succeed if at least one guard in GUARDS is successfully enforced."
    (enforce (< 0
      (length
        (filter
          (= true)
          (map (try-enforce-guard) guards))))
      "None of the guards passed")
  )

  (defun try-enforce-guard (g:guard)
    (try false (enforce-guard g))
  )

  (defun chain-gas-price ()
    "Return gas price from chain-data"
    (at 'gas-price (chain-data)))
  ; END OF UTIL COPY

  (defcap ALLOW_GAS () true)

  (defun init ()
    (coin.create-account GAS_STATION
      (guard-any
        [
          (create-gas-payer-guard)
          NS_KEYSET
        ]))
  )

  (defun create-gas-payer-guard:guard ()
    (create-user-guard (gas-payer-guard))
  )

  (defun gas-payer-guard ()
    (require-capability (GAS))
    (require-capability (ALLOW_GAS))
  )
)

(if (read-msg 'upgrade)
  ["upgrade"]
  [
    (init)
  ]
)
(enforce-guard NS_KEYSET)
(coin.details GAS_STATION)
