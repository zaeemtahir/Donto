import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import 'firebase/compat/storage' // Import storage from index.js
import firebase from 'firebase/compat/app'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../Config/firebase'
import 'react-toastify/dist/ReactToastify.css'
import '../Login/Login.css'
import './signup.css'

const DocSignupPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [qualification, setQualification] = useState('')
  const [pmdcNumber, setPMDC] = useState('')
  const [role, setRole] = useState('doctor')
  const [dob, setDob] = useState('')
  const [cnic, setCnic] = useState('')
  const [profileUrl, setProfileUrl] = useState('')
  const [file, setFile] = useState(null)
  const [cnicValid, setCnicValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setEmailValid(false)
      return
    }

    try {
      const fileUrl = await handleUpload()
      const res = await axios.post(
        `http://localhost:3000/api/v1/auth/register`,
        {
          email,
          password,
          name,
          role,
          gender,
          dob,
          cnic,
          qualification,
          pmdcNumber,
          profileUrl: fileUrl,
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
        title: 'Error...',
        text: 'Something went wrong',
      })
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `profiles/${file.name}`)
      await uploadBytes(storageRef, file)
      const fileUrl = await getDownloadURL(storageRef)
      setProfileUrl(fileUrl)
      console.log(fileUrl)
      return fileUrl // Return the file URL after upload
    }
    return error
  }

  // const handleUpload = (event) => {
  //   const selectedFile = event.target.file[0];

  //   if(selectedFile){
  //     const storageRef = firebase.storage().ref()
  //     const fileRef = storageRef.child(selectedFile.name)

  //     fileRef.put(selectedFile).then((snapshot) =>{
  //       snapshot.ref.getDownloadURL().then((downloadURL) =>{
  //         console.log(downloadURL);
  //         setProfileUrl(downloadURL);
  //       });
  //     });
  //   }else {
  //     console.log('No file selected')
  //   }
  // };

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value
    setEmail(inputEmail)
    setEmailValid(validateEmail(inputEmail))
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    return emailRegex.test(email)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }
  const calculateAge = (dateString) => {
    const today = new Date()
    const birthDate = new Date(dateString)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }
    return age
  }

  const handleDOBChange = (e) => {
    const selectedDate = e.target.value
    const age = calculateAge(selectedDate)
    if (age < 18) {
      Swal.fire({
        icon: 'error',
        title: 'Age Error',
        text: 'Age must be greater than 18!',
      })
      setDob('')
    } else {
      setDob(selectedDate)
    }
  }
  const validateCNIC = (cnic) => {
    const cnicPattern = /^\d{5}\d{7}\d{1}$/
    return cnicPattern.test(cnic)
  }

  const handleCNICChange = (event) => {
    const inputCnic = event.target.value
    setCnic(inputCnic)
    setCnicValid(validateCNIC(inputCnic))
  }

  const handleQualificationChange = (e) => {
    setQualification(e.target.value)
  }

  const handlePMDCChange = (e) => {
    setPMDC(e.target.value)
  }

  const handleBackToLogin = () => {
    navigate('/Login')
  }

  return (
    <>
      <section className="h-100 gradient-form pb-5">
        <form onSubmit={handleSubmit}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                  <div className="row g-0">
                    <div className="text-center col-12 mt-5">
                      <h4 className="mt-1 mb-2 pb-1">
                        We are The Tooth Faries
                      </h4>
                      <p className="mb-4">Please Enter Your Details</p>
                    </div>

                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="form-outline mb-4">
                          <input
                            onBlur={handleNameChange}
                            type="text"
                            id="doctor-name"
                            className="form-control"
                            placeholder="Full Name"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            onBlur={handleEmailChange}
                            type="email"
                            id="doctor-email"
                            className={`form-control ${
                              emailValid ? '' : 'is-invalid'
                            }`}
                            placeholder="Email Address"
                            required
                          />
                          {!emailValid && (
                            <div className="invalid-feedback">
                              Please enter a valid email address.
                            </div>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            onBlur={handlePasswordChange}
                            type="password"
                            id="doctor-password"
                            placeholder="Password"
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <select
                            onBlur={handleGenderChange}
                            type="password"
                            id="doctor-gender"
                            placeholder="Choose gender"
                            className="form-control"
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="form-outline mb-4">
                          <input
                            onBlur={handleCNICChange}
                            type="text"
                            pattern="\d{5}-\d{7}-\d{1}"
                            id="doctor-cnic"
                            placeholder="CNIC Number"
                            className={`form-control ${
                              cnicValid ? '' : 'is-invalid'
                            }`}
                            value={cnic}
                            onChange={(e) => setCnic(e.target.value)}
                            required
                            title="CNIC should be in the format 12345-1234567-1"
                          />
                          {!cnicValid && (
                            <div className="invalid-feedback">
                              CNIC should be in the format 12345-1234567-1
                            </div>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <div class="">
                            <div class="form-group">
                              <label for="dob">Date of birth</label>
                              <input
                                onBlur={handleDOBChange}
                                type="date"
                                id="doctor-dob"
                                class="form-control"
                                placeholder="DD/MM/YYYY"
                                required
                              />
                            </div>
                          </div>
                          {/*
                                <input
                                  onBlur={handleDOBChange}
                                  type="date"
                                  id="doctor-dob"
                                  placeholder="Date of Birth"
                                  className="form-control"
                                  required
                                /> */}
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            onBlur={handleQualificationChange}
                            type="text"
                            id="doctor-qualification"
                            placeholder="Qualification"
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            onBlur={handlePMDCChange}
                            type="text"
                            pattern="[A-Z]{2}\d{6}"
                            id="doctor-pmdc"
                            placeholder="PMDC Number"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-1 mb-4 pb-1">
                    <button
                      onClick={handleSubmit}
                      className="theme-btn btn-fill"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                  <a
                    className="text-primary text-decoration-none d-flex align-items-center justify-content-center pb-3 mb-5"
                    href="#"
                    onClick={handleBackToLogin}
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default DocSignupPage
