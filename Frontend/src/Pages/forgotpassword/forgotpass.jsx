import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './forgotPass.css'
import Swal from 'sweetalert2'
import axios from 'axios'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value)
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      })
    } else {
      try {
        const res = await axios.patch(`http://localhost:3000/api/v1/auth`, {
          email: email,
          password: newPassword,
        })
        if (res.status === 200) {
          Swal.fire({
            title: 'Great!',
            text: 'Password Changed Successfully!',
            icon: 'success',
          }).then(() => {
            window.location.href = '/login'
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Email!',
        })
      }
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Forgot Password</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    onBlur={handleEmailChange}
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <div className="password-input-container">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      onBlur={handlePasswordChange}
                      className="form-control"
                      id="password"
                      placeholder="New password"
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    >
                      <i
                        className={
                          passwordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'
                        }
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPass" className="form-label">
                    Confirm New Password
                  </label>
                  <div className="password-input-container">
                    <input
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      onBlur={handleConfirmPasswordChange}
                      className="form-control"
                      id="confirmPass"
                      placeholder="Confirm New Password"
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <i
                        className={
                          confirmPasswordVisible
                            ? 'fas fa-eye'
                            : 'fas fa-eye-slash'
                        }
                      ></i>
                    </span>
                  </div>
                </div>
                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={changePassword}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
