import React from 'react'
import '../modals.css'

const Backdrop = (props) => {
  return (
    <div className="backdrop" onClick={props.onClose}></div>
  )
}

export default Backdrop