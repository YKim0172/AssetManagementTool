import React from 'react'
import "../login.css"
import space from "../assets/space.jpg"
import LoginForm from '../components/LoginForm'
function Login () {
  return (
    <div className="wrapper-main-login" style={{backgroundImage: `url(${space})`, backgroundSize: 'cover'}}>
        <LoginForm />
    </div>
  )
}

export default Login