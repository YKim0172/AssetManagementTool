import React from 'react'
import "../DetailedUserPage.css"
import door from "../assets/logoutdoor.jpg"
import { UserContext } from '../UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'


const UserNavbar = () => {
  const {ready, user, setUser} = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  async function logout() {
    await axios.post('/user/logout');
    setRedirect('/');
    setUser(null);
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }


  return (
    <div className="navbar-bubble">
        <div className="logo">Assetsment</div>
        <div className="logout-button-area">
            <Link onClick={logout}>
              <img src={door} className="img-logout-icon"></img>
            </Link>
        </div>
    </div>
  )
}

export default UserNavbar