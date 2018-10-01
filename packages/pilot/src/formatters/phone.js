export default phone =>
  phone.replace(
    /^(\+[1-9]{2})?([1-9]{2})(9{1})?(\d{4})(\d{3,4})$/,
    '($2) $3$4-$5'
  )
