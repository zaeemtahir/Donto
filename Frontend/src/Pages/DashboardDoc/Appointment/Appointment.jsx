import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Appointment.css'

const Appointment = () => {
  const [appointment, setAppointment] = useState([])
  const [expiredAppointments, setExpiredAppointments] = useState([])
  const [reviews, setReviews] = useState([])

  const comments = [
    {
      id: 1,
      name: 'John Doe',
      datePosted: '2023-12-08',
      rating: 5,
      text: 'Great experience with the doctor. Highly recommended!',
    },
  ]

  const getAppointment = async () => {
    try {
      const name = localStorage.getItem('doctorName')
      const response = await axios.get(
        `http://localhost:3000/api/v1/appointmentDoctor/${name}`,
      )
      const jsonData = response.data
      setAppointment(jsonData.data)
      filterExpiredAppointments(jsonData.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/appointmentDoctor/${appointmentId}`,
      )
      localStorage.setItem('appointmentDeleted', 'true')
      setAppointment((prev) =>
        prev.filter((appointment) => appointment._id !== appointmentId),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleStatus = async (appointmentId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/appointmentDoctor/${appointmentId}`,
        { status: 'Awaiting Payment' },
      )
      localStorage.setItem('statusUpdated', 'true')
      setAppointment((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: 'Awaiting Payment' }
            : appointment,
        ),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const convertToAmPm = (time24) => {
    const [hours, minutes] = time24.split(':')
    const hoursInt = parseInt(hours, 10)
    const period = hoursInt >= 12 ? 'PM' : 'AM'
    const hours12 = hoursInt % 12 || 12
    return `${hours12}:${minutes} ${period}`
  }

  const isExpired = (appointment) => {
    const appointmentDateTime = new Date(
      `${appointment.appointmentDate.slice(0, 10)}T${
        appointment.appointmentTime
      }`,
    )
    return new Date() > appointmentDateTime
  }

  const filterExpiredAppointments = (appointments) => {
    const expired = appointments.filter(isExpired).map((appointment) => ({
      ...appointment,
      status: appointment.status === 'Paid' ? 'Completed' : 'Incomplete',
    }))
    const current = appointments.filter(
      (appointment) => !isExpired(appointment),
    )
    setAppointment(current)
    setExpiredAppointments(expired)
  }

  const getUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/reviewUser/${userId}`,
      )
      return response.data.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const getReviews = async () => {
    try {
      const name = localStorage.getItem('doctorName')
      const response = await axios.get(
        `http://localhost:3000/api/v1/reviewDoctor/${name}`,
      )
      const reviews = response.data.data
      const reviewsWithUserDetails = await Promise.all(
        reviews.map(async (review) => {
          const user = await getUser(review.user)
          return { ...review, user }
        }),
      )

      setReviews(reviewsWithUserDetails)
      console.log(reviewsWithUserDetails)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppointment()
    getReviews()
  }, [])

  useEffect(() => {
    const appointmentDelete = localStorage.getItem('appointmentDeleted')
    if (appointmentDelete === 'true') {
      Swal.fire({
        title: 'Good job!',
        text: 'Appointment has been Deleted Successfully!',
        icon: 'success',
      })
      localStorage.removeItem('appointmentDeleted')
    }
  }, [appointment])

  useEffect(() => {
    const appointmentStatus = localStorage.getItem('statusUpdated')
    if (appointmentStatus === 'true') {
      Swal.fire({
        title: 'Good job!',
        text: 'Appointment has been Confirmed!',
        icon: 'success',
      })
      localStorage.removeItem('statusUpdated')
    }
  }, [appointment])

  return (
    <Container fluid className="appointment-section">
      <section className="h-100 gradient-form pb-5">
        <div className="custom-container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-12 text-center mt-5">
                    <h3 className="mt-1 mb-2 pb-1">Current Appointments</h3>
                  </div>
                  <div className="col-12">
                    <div className="card-body p-md-3 mx-md-4">
                      <Row className="appointment-container">
                        {appointment.length > 0 ? (
                          appointment.map((appointment) => (
                            <div
                              key={appointment._id}
                              className="col-md-4 mb-3"
                            >
                              <div className="card appointment-card">
                                <h5>New Appointment</h5>
                                <div className="card-body">
                                  <p className="card-title">
                                    <b>Patient Name: </b>
                                    {appointment.firstName}{' '}
                                    {appointment.lastName}
                                  </p>
                                  <p className="card-text">
                                    <b>Date: </b>
                                    {appointment.appointmentDate.slice(0, 10)}
                                  </p>
                                  <p className="card-text">
                                    <b>Time: </b>
                                    {convertToAmPm(appointment.appointmentTime)}
                                  </p>
                                  <p className="card-text">
                                    <b>Status:&nbsp;</b>
                                    <span
                                      style={{
                                        color:
                                          appointment.status === 'pending'
                                            ? 'red'
                                            : appointment.status ===
                                              'Awaiting Payment'
                                            ? 'orange'
                                            : 'green',
                                      }}
                                    >
                                      {appointment.status}
                                    </span>
                                  </p>
                                  {appointment.status === 'pending' ? (
                                    // Render actions for pending appointments
                                    <div className="appointment-actions">
                                      <button
                                        onClick={() =>
                                          handleStatus(appointment._id)
                                        }
                                        type="button"
                                        className="btn btn-outline-success"
                                      >
                                        <div className="texts">Accept</div>
                                      </button>
                                      <button
                                        style={{ borderRadius: '5px' }}
                                        onClick={() =>
                                          handleDelete(appointment._id)
                                        }
                                        type="button"
                                        className="btn btn-outline-danger"
                                      >
                                        <div className="texts">Decline</div>
                                      </button>
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="no-appointments-message">
                            <p>No new appointments found.</p>
                          </div>
                        )}
                      </Row>
                      <div className="mt-5">
                        <h3>Previous Appointments</h3>
                        <Row className="appointment-container">
                          {expiredAppointments.length > 0 ? (
                            expiredAppointments.map((appointment) => (
                              <div
                                key={appointment._id}
                                className="col-md-4 mb-3"
                              >
                                <div className="card appointment-card">
                                  <h5>Previous Appointment</h5>
                                  <div className="card-body">
                                    <p className="card-title">
                                      <b>Patient Name: </b>
                                      {appointment.firstName}{' '}
                                      {appointment.lastName}
                                    </p>
                                    <p className="card-text">
                                      <b>Date: </b>
                                      {appointment.appointmentDate.slice(0, 10)}
                                    </p>
                                    <p className="card-text">
                                      <b>Time: </b>
                                      {convertToAmPm(
                                        appointment.appointmentTime,
                                      )}
                                    </p>
                                    <p className="card-text">
                                      <b>Status: </b>
                                      <span
                                        style={{
                                          color:
                                            appointment.status === 'Incomplete'
                                              ? 'red'
                                              : 'green',
                                        }}
                                      >
                                        {appointment.status}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="no-expired-appointments-message">
                              <p>No previous appointments found.</p>
                            </div>
                          )}
                        </Row>
                      </div>
                      <div className="mt-5">
                        <h3>Patient Reviews</h3>
                        {reviews.length > 0 ? (
                          reviews.map((comment) => (
                            <div
                              key={comment._id}
                              className="card mb-3 review-card"
                            >
                              <div className="card-body">
                                <div className="review-info">
                                  From: <strong>{comment.user.name}</strong>
                                </div>
                                <div className="review-info">
                                  Date: {comment.createdAt.slice(0, 10)}
                                </div>
                                <div className="star-rating">
                                  {/* Render star icons based on the rating */}
                                  {Array.from(
                                    { length: comment.rating },
                                    (_, index) => (
                                      <FaStar key={index} color="#ffc107" />
                                    ),
                                  )}
                                </div>
                                <p>{comment.reviewText}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="no-reviews-message">
                            <p>No reviews available.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default Appointment
