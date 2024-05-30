(namespace (ns.create-principal-namespace (read-keyset 'registry-keyset )))

(module registry GOVERNANCE

  (defconst NS_HASH:string (ns.create-principal-namespace (read-keyset 'registry-keyset)))
  (defconst REGISTRY_KS_NAME:string (format "{}.{}" [NS_HASH 'registry-keyset]))
  (defconst BASE:integer 64)

  (defcap GOVERNANCE ()
    @doc "No one should be able to upgrade the base contract."
    (enforce-guard REGISTRY_KS_NAME)
  )

  (defconst CURRENT_DIAMETER:integer (read-integer "current-diameter"))

  ; https://en.wikipedia.org/wiki/Table_of_the_largest_known_graphs_of_a_given_diameter_and_maximal_degree
  ; set first 3 to 20 because the network alreday have 20 chains
  (defconst CHAINS_IN_DIAMETER:[integer] [20, 20, 20, 38, 70, 132, 196, 336, 600, 1250])
  (defconst MAX_STR_LENGTH:integer (^ BASE (at CURRENT_DIAMETER CHAINS_IN_DIAMETER)))

  (defschema registry-schema
    @doc "The registry schema for the numbers."
    guard:guard
  )
  (deftable registry-table:{registry-schema})

  (defcap NUMBER_BELONGS_TO_CHAIN:bool (number:integer diameter:integer)
    @doc "Check if the number blongs to the chain."
    (let* ((chains-in-diameter:[integer] CHAINS_IN_DIAMETER)
           (remainder:integer (mod number (at (- diameter 1) chains-in-diameter)))
          )
      (enforce
        (= remainder (str-to-int 10 (at 'chain-id (chain-data))))
        "The number does not belong to this chain"
      )
    )
  )

  (defcap OWNER(name:string)
    (enforce-guard (get-guard name))
    (compose-capability (VALID_NUMBER name))
  )

  (defcap VALID_NUMBER(name:string)
    @doc "Check if the number is valid."
    (let ((name-number (str-to-int 64 (base64-encode name))))
      (enforce (is-charset CHARSET_ASCII name) "The name is not ASCII")
      (enforce (!= name "") "The name is empty")
      (enforce (< name-number MAX_STR_LENGTH) "The name is too big for current diameter")
      (compose-capability (NUMBER_BELONGS_TO_CHAIN name-number CURRENT_DIAMETER))
    )
  )

  (defun register:string (name:string guard:guard)
    @model [
      (property (!= name ""))
      (property (< name-number MAX_STR_LENGTH))
    ]
    (with-capability (VALID_NUMBER name)
      (insert registry-table name
        { "guard" : guard }
      )
    )
  )

  (defun transfer-ownership:string (name:string new-owner-guard:guard)
    @model [
      (property (!= name ""))
      (property (< name-number MAX_STR_LENGTH))
      (property (row-enforced registry-table 'guard name))
    ]
    (with-capability (OWNER name)
      (update registry-table name
        { 'guard : new-owner-guard }
      )
    )
  )

  (defun get-guard:guard(name:string)
    (at 'guard (read registry-table name))
  )

  (defun get-account:string (account:string)
    @doc "Get principal account based on the account's guard."
    (create-principal (get-guard account))
  )
)

(if (read-msg 'upgrade)
  ["Upgrade successful"]
  [
    (define-keyset registry.REGISTRY_KS_NAME (read-keyset 'registry-keyset))
    (enforce-guard registry.REGISTRY_KS_NAME)
    (create-table registry-table)
  ]
)
