import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from '../images/google-icon.svg'
import FacebookIcon from '../images/facebook-icon.svg'

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/home');
        }
        else {
            alert('Invalid Credentials')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <div className="header text-center my-4">
                <p className="fw-bold fs-3">Sign Up</p>
                <p className="newUser">Already Registered? <Link to="/login" className='text-decoration-none'>Login</Link>
                </p>
            </div>
            <div className="row g-3 align-items-center">
                <div className="col col-sm-4 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name='name' aria-describedby="nameHelp" onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Re-enter Password</label>
                            <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' onChange={onChange} minLength={5} required />
                        </div>
                        <div className="button text-center my-4">
                            <button type="submit" className="btn btn-primary col-4">Submit</button>
                        </div>
                    </form>
                    <div className="social-login my-4">
                        <div className="social-login-container d-flex align-items-center justify-content-between">
                            <div className="line" style={{ borderTop: '1px solid black', width: '33%' }}></div>
                            <p className='social-login-content'>Or Connect With</p>
                            <div className="line" style={{ borderTop: '1px solid black', width: '33%' }}></div>
                        </div>
                        <div className="social-login-icons my-3 d-flex align-items-center justify-content-evenly">
                            <a href='/#'><img src={GoogleIcon} alt="Google" height={35} width={35} /></a>
                            <a href='/#'><img src={FacebookIcon} alt="Facebook" height={35} width={35} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}