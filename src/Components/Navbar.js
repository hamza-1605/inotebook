import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import notebook from './notebook.png'

const Navbar = () => {
  const location = useLocation() ;

  const logout = () => {
    localStorage.removeItem('token') ;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {/* eslint-disable-next-line */}
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={notebook} alt="iNotebook" width="45" height="45"/>
        </Link>
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${(location.pathname)==="/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${(location.pathname)==="/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          {
            !localStorage.getItem('token') ? 
            <form className="d-flex">
                <Link className="btn btn-outline-light mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-outline-light mx-2" to="/signup" role="button">Signup</Link>
            </form>
                :
                <Link className="btn btn-outline-light mx-1" to="/login" onClick={logout} role="button">Log Out</Link>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
