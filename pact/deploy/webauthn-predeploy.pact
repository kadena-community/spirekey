(let ((ns-name (ns.create-principal-namespace (read-keyset 'webauthn-keyset))))
  (define-namespace
    ns-name
    (read-keyset 'webauthn-keyset )
    (read-keyset 'webauthn-keyset )
  )
  (namespace ns-name)
  (define-keyset
    (format "{}.{}"
      [ns-name 'webauthn-keyset]
    )
    (read-keyset 'webauthn-keyset)
  )
)
