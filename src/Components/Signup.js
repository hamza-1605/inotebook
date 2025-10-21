import React , {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertContext from '../Context/Alert/alertContext'

const Signup = () => {

  const aContext = useContext(AlertContext)
  const { alertContent , triggerAlert  } = aContext

  const navigate = useNavigate(); 
  const [credentials, setCredentials] = useState({ uname:"" , email: "" , password: ""  , cpassword: ""})

  const onChange = (e) => {
    setCredentials({...credentials , [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    e.preventDefault() ;

    if(credentials.password !== credentials.cpassword){
      return triggerAlert('signupFailed' , "Your passwords doesn't match, please try again")
    }

    const response = await fetch('https://inotebook-brown-delta.vercel.app/api/auth/createuser' , {
      method: "POST" ,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credentials.uname, email: credentials.email, password: credentials.password })
    })

    const json = await response.json() ;
    if(json.success){
      setCredentials({ uname:"" , email: "" , password: "" });
      localStorage.setItem('token' , json.token);
      navigate('/') ;
      triggerAlert( 'signup' , "Account Created Successfully" )
    }
    else{
      triggerAlert( 'signupFailed' , json.message)
    }
  }
      
  return (
    <>
    {alertContent}
    <div className='container my-4' id="background">
      <form onSubmit={ submitForm }>
        <h2 style={{textAlign: "center"}}>Sign up & Create an account to use iNotebook</h2>
            <div className="mb-3">
                <label htmlFor="uname" className="form-label">Name*</label>
                <input type="text" className="form-control" name="uname" id="uname" value={credentials.uname} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address*</label>
                <input type="email" className="form-control" name="email" id="email" value={credentials.email} aria-describedby="emailHelp" autoComplete='username' onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password*</label>
                <input type="password" className="form-control" name="password" id="password" value={credentials.password} autoComplete='new-password' onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password*</label>
                <input type="password" className="form-control" name="cpassword" id="cpassword" value={credentials.cpassword} autoComplete='new-password' onChange={onChange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary">Create an Account</button>
        </form>
        <p className='mt-4'>Already have an account? <Link to="/login">Login Here</Link></p>
    </div>
    </>
  )
}

export default Signup