(namespace (read-string 'webauthn-namespace))

(module wallet-register GOVERNANCE
  (defconst GOVERNANCE_KEYSET (read-string 'webauthn-keyset-name))

  (defcap GOVERNANCE() 
    (enforce-guard GOVERNANCE_KEYSET)
  )

	(defschema wallet-schema
		name : string
	)
	(deftable wallet-table:{wallet-schema})

	(defun register-wallet (domain:string name:string)
		@model [
			(property (!= domain ""))
			(property (!= name ""))
			(property (not (row-exists wallet-table domain 'before)))
			(property (row-exists wallet-table domain 'after))
			(property (authorized-by GOVERNANCE_KEYSET))
		]
		(enforce (!= domain "") "domain cannot be an empty string")
		(enforce (!= name "") "name cannot be an empty string")
		
		(with-capability (GOVERNANCE)
			(insert wallet-table domain 
				{ 'name : name }
			)
		)
	)

	(defun get-wallets()
		(map (get-wallet) (keys wallet-table))
	)

	(defun get-wallet(id:string)
		(with-read wallet-table id
			{ 'name   := name }
			{ 'domain : id
      , 'name   : name
			}
		)
	)
    
)

(if (read-msg 'upgrade)
	["Upgrade successful"]
	(let ((ks wallet-register.GOVERNANCE_KEYSET))
		(enforce-guard ks)
		(create-table wallet-table)
	)
)
