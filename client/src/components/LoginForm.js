import React from 'react'
import "../login.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../UserContext'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/user/login', {email, password});
      if (data) {
        setUser(data);
        alert('Login successful');
        setRedirect(true);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Login failed');
    }
  } 

  if (redirect) {
    return <Navigate to={'/dashboard'} />
  }

  return (
    <div className="wrapper-login">
        <div className="wrapper-box">
            <span className="msg-login">Login to Assetsment</span>

            <form className="form" onSubmit={loginUser}>
                <input required type="text" placeholder='email' value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input required type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
                <button>Log in</button>
                <div className='signup-redirect'>
                  First time with us?
                  Then sign up <Link to='/signup'>here</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginForm