import React from 'react'
import mountains from '../assets/mountains.jpg'
import SignupForm from '../components/SignupForm'
import "../login.css"

const Signup = () => {
  return (
    <div className="wrapper-main-login" style={{backgroundImage: `url(${mountains})`, backgroundSize: 'cover'}}>
        <SignupForm />
    </div>
  )
}

export default Signup

