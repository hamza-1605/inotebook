import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AlertContext from '../Context/Alert/alertContext';

const Login = () => {

    const aContext = useContext(AlertContext)
    const { alertContent , triggerAlert  } = aContext

    const navigate = useNavigate() ;
    const [credentials, setCredentials] = useState({ email: "" , password: "" });

    const onchange = (e) => {
        setCredentials({ ...credentials , [e.target.name]: e.target.value })
    }

    const submitForm = async (e) => {
        e.preventDefault() ;

        const response = await fetch('https://inotebook-brown-delta.vercel.app/api/auth/login' , {
            method: "POST" ,
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) 
        })

        const json = await response.json() ;

        if(json.success){
            localStorage.setItem( 'token' , json.token ) ;
            navigate('/') ;
            triggerAlert( 'login' , 'Logged in successfully!')
        }
        else{
            console.log(json.message);
            triggerAlert( 'loginFailed' , json.message)
        }
    }

  return (
    <>
    {alertContent}
      <div className='container my-4' id="background">
        <form onSubmit={submitForm}>
            <h2 style={{textAlign: "center"}}>Login to continue with iNotebook</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onchange} aria-describedby="emailHelp" autoComplete='email' required/>
                <div id="emailHelp" className="form-text">We'll never share your credentials with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" value={credentials.password} autoComplete='current-password' onChange={onchange} required/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>              
        <p className='mt-4'>New to iNotebook? <Link to="/signup">Create an account</Link></p>
      </div>
    </>
  )
}

export default Login
