(interface translatable
  (defschema translation
    bundle-hash : string
    uri         : string
  )
  (defun get-translation:object{translation}(country:string locale:string)
    @doc "Returns the hash and uri associated to the requested bundle"
  )
)
(interface meta
  (defschema meta-data
    meta-hash : string
    uri       : string
  )
  (defun get-meta:object{meta-data}()
    @doc "Returns the hash and uri associated to the meta data"
  )
)
