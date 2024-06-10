import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
// import { useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './Login.css'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = ({ setIsLogged }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentRole, setCurrentRole] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const login = async (email, password) => {
    console.log(email, password)
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/auth/login`, {
        email,
        password,
      })

      console.log(res)

      if (res.status === 200) {
        if (res.data.role === 'doctor') {
          localStorage.setItem('doctorId', res.data.data._id)
          localStorage.setItem('doctorName', res.data.data.name)
          setCurrentRole('doctor')
          navigate('/doctorDash')
        }
        if (res.data.role === 'patient') {
          console.log(res.data.role)
          localStorage.setItem('userId', res.data.data._id)
          setCurrentRole('patient')
          navigate('/DashDisplay')
        }
      }
      setIsLogged(true)
      return true
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Email or Password!',
      })
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Email:', email, 'Password:', password)
    const logged = await login(email, password)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleCreateNew = () => {
    navigate('/SignupPage')
  }

  const forgotpass = () => {
    navigate('/ForgotPasswordPage')
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <>
      <section className="h-100 gradient-form pb-5">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">
                          We are The Tooth Faries
                        </h4>
                      </div>
                      <p className="d-flex justify-content-start">
                        Please login to your account
                      </p>
                      <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
                        <div className="form-outline mb-4">
                          <input
                            onChange={handleEmailChange}
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Email Address"
                            required
                          />
                        </div>

                        <div
                          className="form-outline mb-4"
                          style={{ position: 'relative' }}
                        >
                          <input
                            onChange={handlePasswordChange}
                            type={passwordVisible ? 'text' : 'password'}
                            id="form2Example22"
                            placeholder="Password"
                            className="form-control"
                            required
                            style={{ paddingRight: '40px' }} // Adjust paddingRight to make space for the eye icon
                          />
                          <span
                            className="password-toggle-icon"
                            onClick={togglePasswordVisibility}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                            }}
                          >
                            <i
                              className={
                                passwordVisible
                                  ? 'fas fa-eye'
                                  : 'fas fa-eye-slash'
                              }
                            ></i>
                          </span>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="theme-btn btn-fill" type="submit">
                            Log in
                          </button>
                          <a
                            className="text-muted text-decoration-none"
                            onClick={forgotpass}
                            href="#!"
                          >
                            Forgot password?
                          </a>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={handleCreateNew}
                          >
                            Create new
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a clinic</h4>
                      <p className="small mb-0">
                        Welcome to Donto, where your smile is our passion!
                        Whether you're here for a routine check-up, a dazzling
                        teeth whitening, or a transformative dental procedure,
                        our expert team is dedicated to providing you with
                        exceptional care in a comfortable, friendly environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
