import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import './PatientDash.css'
import '../../Login/Login.css'
import '../../signup/signup.css'
import Swal from 'sweetalert2'
import { FaHandHolding } from 'react-icons/fa'
import { HttpStatusCode } from 'axios'
import axios from 'axios'

const PatientDashBoard = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    department: '',
    selectedDoctor: '',
    appointmentDate: '',
    appointmentTime: '',
  })

  const [docName, setDocName] = useState([])

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Validate selected date and time
  const isValidDateTime = () => {
    const { appointmentDate, appointmentTime } = formData
    const selectedDateTime = new Date(`${appointmentDate}T${appointmentTime}`)
    const currentDateTime = new Date()
    return selectedDateTime > currentDateTime
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isValidDateTime()) {
      Swal.fire({
        title: 'Invalid Date/Time',
        text: 'Appointment date and time must be in the future.',
        icon: 'error',
      })
      return
    }

    try {
      await axios.post('http://localhost:3000/api/v1/appointmentPatient', {
        user: localStorage.getItem('userId'),
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        doctor: formData.selectedDoctor,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
      })
      window.location.reload()
      localStorage.setItem('appointmentSuccess', 'true')
    } catch (error) {
      console.log('Error')
    }
  }

  useEffect(() => {
    getDoctorNames()
  }, [])

  useEffect(() => {
    const appointmentSuccess = localStorage.getItem('appointmentSuccess')
    if (appointmentSuccess === 'true') {
      Swal.fire({
        title: 'Good job!',
        text: 'Your Appointment has been Booked Successfully!',
        icon: 'success',
      })
      localStorage.removeItem('appointmentSuccess')
    }
  }, [])

  const getDoctorNames = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/doctors')
      const doctors = response.data.data
      const names = doctors.map((doctor) => doctor.name)
      setDocName(names)
    } catch (error) {
      console.log('Error')
    }
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      department: '',
      selectedDoctor: '',
      appointmentDate: '',
      appointmentTime: '',
    })
  }

  return (
    <>
      <section className="h-100 gradient-form pb-5">
        <Form onSubmit={handleSubmit}>
          <div className="custom-container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10 col-lg-12 col-md-12">
                <div className="card rounded-3 text-black">
                  <div className="row g-0">
                    <div className="text-center col-12 mt-5">
                      <h3 className="mt-1 mb-2 pb-1">
                        Patient Appointment Form
                      </h3>
                      <p className="mb-4">Please Enter Your Details</p>
                    </div>

                    <div className="card-body p-4 p-md-5 mx-md-4">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline mb-4">
                            <Form.Group controlId="firstName">
                              <Form.Control
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                              />
                            </Form.Group>
                          </div>

                          <div className="form-outline mb-4">
                            <Form.Group controlId="age">
                              <Form.Control
                                type="number"
                                placeholder="Age"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                              />
                            </Form.Group>
                          </div>

                          <div className="form-outline mb-4">
                            <Form.Group controlId="selectedDoctor">
                              <Form.Control
                                as="select"
                                name="selectedDoctor"
                                value={formData.selectedDoctor}
                                onChange={handleInputChange}
                                required
                              >
                                <option>Select Doctor</option>
                                {docName.map((name, index) => (
                                  <option key={index} value={name}>
                                    {name}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-outline mb-4">
                            <Form.Group controlId="lastName">
                              <Form.Control
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                              />
                            </Form.Group>
                          </div>

                          <div className="form-outline mb-4">
                            <div className="form-group">
                              <Form.Group controlId="appointmentDate">
                                <Form.Label>Appointment Date</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="appointmentDate"
                                  value={formData.appointmentDate}
                                  onChange={handleInputChange}
                                  required
                                />
                              </Form.Group>
                            </div>
                          </div>

                          <div className="form-outline mb-4">
                            <div className="form-group">
                              <Form.Group controlId="appointmentTime">
                                <Form.Label>Appointment Time</Form.Label>
                                <Form.Control
                                  type="time"
                                  name="appointmentTime"
                                  value={formData.appointmentTime}
                                  onChange={handleInputChange}
                                  required
                                />
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-1 mb-4 pb-1">
                      <button type="submit" className="btn btn-outline-success">
                        <div className="texts">Submit</div>
                      </button>

                      <button
                        style={{ 'border-radius': '5px' }}
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={resetForm}
                      >
                        <div className="texts">Cancel</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </section>
    </>
  )
}

export default PatientDashBoard
