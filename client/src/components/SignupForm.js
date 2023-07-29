import React from 'react'
import "../login.css"
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/user/register', {
                name,
                email,
                password,
            });
            alert('Registration successful');
            const {data} = await axios.post('/user/login', {email, password});
            if (data) {
                setUser(data);
                setRedirect(true);
            } else {
                alert('Login failed');
            }

        } catch (error) {
            alert('Registration failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/dashboard'} />
    }

    return (
        <>
        <div className="wrapper-welcome">
            <span className="welcome-message">
                Welcome! Let's get you started.
            </span>
            <span className="welcome-message">
                Tell us a little about yourself.
            </span>
        </div>


        <div className="wrapper-login">
            <div className="wrapper-box">
                <span className="msg-signup">Get Started With Assetsment</span>

                <form className="form-signup" onSubmit={registerUser}>
                    <input required type="text" placeholder='name' value={name} onChange={ev => setName(ev.target.value)}/>
                    <input required type="text" placeholder='email' value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input required type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="btn-signup">Sign up</button>
                    <div>
                        Already have an account? Then log in <Link to='/login'>here</Link>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default SignupForm