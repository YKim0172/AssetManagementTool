import React from 'react'
import "../home.css"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="wrapper-nav">
      <nav role='navigation' className="navbar-new">
        <div className="logo-main">Assetsment</div>
        <div className="auth-buttons">
          <Link to='/login' className="button">Log In</Link>
          <Link to='signup' className="button">Sign up</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;