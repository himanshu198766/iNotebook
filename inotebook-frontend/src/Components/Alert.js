import React from 'react'

export default function Alert(props) {
  const capitalize = (word) => {
    if (word === 'danger') return 'Error'
    return props.alert.type.charAt(0).toUpperCase() + props.alert.type.slice(1)
  }
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.alert.type)}</strong>
        {' : '}
        {props.alert.message}
      </div>
    )
  )
}
