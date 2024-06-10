import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
// import { useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import '../Login/Login.css'
import Swal from 'sweetalert2'

import axios from 'axios'

const SignupPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [role, setRole] = useState('patient')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setEmailError(
        'Please enter a valid email address in the format: abc@gmail.com',
      )
      return
    }

    console.log(
      'Name:',
      name,
      'Email:',
      email,
      'Password:',
      password,
      'Role:',
      role,
      'Gender:',
      gender,
    )

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/auth/register`,
        {
          email,
          password,
          name,
          role,
          gender,
        },
      )
      Swal.fire({
        title: 'Great!',
        text: 'Signed up Successfully!',
        icon: 'success',
      }).then(() => {
        window.location.href = '/login'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email Already Exists!',
      })
    }

    // console.log('Email:', email)
    // console.log('Password:', password)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (emailError) {
      setEmailError('')
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }

  const handleBackToLogin = () => {
    navigate('/Login')
  }

  const handleDocSignup = () => {
    navigate('/DocSignupPage')
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
                          We are The Tooth Fairies
                        </h4>
                      </div>
                      <p className="d-flex justify-content-start">
                        Please Enter Your Details
                      </p>
                      <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
                        <div className="form-outline mb-4">
                          <input
                            onChange={handleNameChange}
                            type="text"
                            id="patient-name"
                            className="form-control"
                            placeholder="Full Name"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            onChange={handleEmailChange}
                            type="email"
                            id="patient-email"
                            className="form-control"
                            placeholder="Email Address"
                            required
                          />
                          {emailError && (
                            <div className="text-danger">{emailError}</div>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            onChange={handlePasswordChange}
                            type="password"
                            id="patient-password"
                            placeholder="Password"
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <select
                            onChange={handleGenderChange}
                            id="patient-gender"
                            placeholder="Choose gender"
                            className="form-control"
                            required
                          >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="text-center pt-1 mb-4 pb-1">
                          <button className="theme-btn btn-fill" type="submit">
                            Sign Up
                          </button>
                        </div>
                      </form>
                      <a
                        className="text-danger text-decoration-none d-flex align-items-center justify-content-center pb-3"
                        href="#"
                        onClick={handleDocSignup}
                      >
                        Sign-up as a doctor.
                      </a>
                      <a
                        className="text-primary text-decoration-none d-flex align-items-center justify-content-center pb-1"
                        href="#"
                        onClick={handleBackToLogin}
                      >
                        Login
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a clinic</h4>
                      <p className="small mb-0">
                        Join the Donto family and experience the difference in
                        dental care! By signing up, you’ll gain easy access to
                        our comprehensive range of services, from routine
                        cleanings to advanced cosmetic and restorative
                        treatments. Our skilled and compassionate team is here
                        to ensure your visits are pleasant and stress-free.
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

export default SignupPage
