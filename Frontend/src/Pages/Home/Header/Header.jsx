import React, { useState, useEffect, useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import logo from '../../../Images/logo.png'
import './Header.css'

const Header = ({ isLogged, setIsLogged }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [doctorId, setDoctorId] = useState(localStorage.getItem('doctorId'))
  //   const userId = localStorage.getItem('userId')
  //   const doctorId = localStorage.getItem('doctorId')
  console.log(localStorage.getItem('userId'))

  const handleUserState = () => {
    console.log('user state called')
    if (userId || isLogged === true) {
      localStorage.removeItem('userId')
      setUserId(undefined)
      setIsLogged(false)
    }
    if (doctorId || isLogged === true) {
      localStorage.removeItem('doctorId')
      localStorage.removeItem('doctorName')
      setDoctorId(undefined)
      setIsLogged(false)
    }
    return
  }

  return (
    <div className="head-bg">
      <Navbar className="navbar" collapseOnSelect expand="lg">
        <Container className="container-head">
          <Navbar.Brand href="/home">
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" expand="lg" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Link to="/home" className="list-item text-decoration-none">
                Home
              </Link>
              <Link to="/about" className="list-item text-decoration-none">
                About
              </Link>
              <Link to="/service" className="list-item text-decoration-none">
                Service
              </Link>
              <Link to="/dentist" className="list-item text-decoration-none">
                Dentist
              </Link>
              <Link to="/contact" className="list-item text-decoration-none">
                Contact
              </Link>
              <Link
                to="/login"
                onClick={handleUserState}
                className="btn btn-danger"
              >
                {isLogged ? 'Logout' : 'Login'}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
