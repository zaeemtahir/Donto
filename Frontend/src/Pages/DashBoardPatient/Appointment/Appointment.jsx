import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'
import './Appointment.css'
import ReviewModal from './ReviewModal'
import { Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Appointment = () => {
  const [appointments, setAppointments] = useState([])
  const [expiredAppointments, setExpiredAppointments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentAppointment, setCurrentAppointment] = useState(null)
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

  const getAppointments = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const response = await axios.get(
        `http://localhost:3000/api/v1/appointmentPatient/${userId}`,
      )
      const jsonData = response.data
      setAppointments(jsonData.data)
      filterExpiredAppointments(jsonData.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleDelete = async (appointmentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:3000/api/v1/appointmentDoctor/${appointmentId}`,
          )
          setAppointments((prev) =>
            prev.filter((appointment) => appointment._id !== appointmentId),
          )
          Swal.fire({
            title: 'Deleted!',
            text: 'Your Appointment has been deleted.',
            icon: 'success',
          })
        } catch (err) {
          console.log(err)
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue deleting the appointment.',
            icon: 'error',
          })
        }
      }
    })
  }

  const handlePayment = (appointmentId) => {
    localStorage.setItem('appointmentId', appointmentId)
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
    const expired = appointments.filter(isExpired)
    const current = appointments.filter(
      (appointment) => !isExpired(appointment),
    )
    setAppointments(current)
    setExpiredAppointments(
      expired.map((appointment) => ({
        ...appointment,
        status: appointment.status === 'Paid' ? 'Complete' : 'Incomplete',
      })),
    )
  }

  const handleShowModal = (appointment) => {
    setCurrentAppointment(appointment)
    console.log(currentAppointment)
    setShowModal(true)
  }
  const handleCloseModal = () => setShowModal(false)

  const handleSubmitReview = async (review) => {
    try {
      axios.post('http://localhost:3000/api/v1/reviews', {
        doctor: currentAppointment.doctor,
        user: currentAppointment.user,
        reviewText: review.comment,
        rating: review.rating,
        appointment: currentAppointment._id,
      })
      Swal.fire({
        title: 'Success!',
        text: 'Your Review has been Recorded.',
        icon: 'success',
      }).then(() => {
        setShowModal(false)
        window.location.reload()
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue creating a review.',
        icon: 'error',
      })
    }
  }
  const getReviews = async () => {
    try {
      const id = localStorage.getItem('userId')
      const response = await axios.get(
        `http://localhost:3000/api/v1/reviews/${id}`,
      )
      const jsonData = response.data
      setReviews(jsonData.data)
      console.log(jsonData.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAppointments()
    getReviews()
  }, [])

  return (
    <Container fluid className="appointment-section">
      <section className="h-100 gradient-form pb-5">
        <div className="custom-container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-12 text-center mt-5">
                    <h3 className="mt-1 mb-2 pb-1">
                      Patient's Current Appointments
                    </h3>
                  </div>
                  <div className="col-12">
                    <div className="card-body p-md-3 mx-md-4">
                      <Row className="appointment-container">
                        {appointments.length > 0 ? (
                          appointments.map((appointment) => (
                            <div
                              key={appointment._id}
                              className="col-md-4 mb-3"
                            >
                              <div className="card appointment-card">
                                <h5>Appointment with {appointment.doctor}</h5>
                                <div className="card-body">
                                  <p className="card-title">
                                    <b>Name: </b>
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
                                    <b>Status: </b>
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
                                  <div className="appointment-actions">
                                    {appointment.status === 'pending' ? (
                                      <button
                                        onClick={() =>
                                          handleDelete(appointment._id)
                                        }
                                        type="button"
                                        className="btn btn-outline-danger"
                                      >
                                        <div className="texts">Cancel</div>
                                      </button>
                                    ) : appointment.status ===
                                      'Awaiting Payment' ? (
                                      <Link to="/payment">
                                        <button
                                          onClick={() =>
                                            handlePayment(appointment._id)
                                          }
                                          type="button"
                                          className="btn btn-outline-success"
                                        >
                                          <div className="texts">Pay Now</div>
                                        </button>{' '}
                                      </Link>
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="no-appointments-message">
                            <p>No current appointments found.</p>
                          </div>
                        )}
                      </Row>
                      <div className="mt-5">
                        <h3>Patient's Previous Appointments</h3>
                        <Row className="appointment-container">
                          {expiredAppointments.length > 0 ? (
                            expiredAppointments.map((appointment) => (
                              <div
                                key={appointment._id}
                                className="col-md-4 mb-3"
                              >
                                <div className="card appointment-card">
                                  <h5>Appointment with {appointment.doctor}</h5>
                                  <div className="card-body">
                                    <p className="card-title">
                                      <b>Name: </b>
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
                                    {appointment.status === 'Complete' &&
                                    appointment.reviewed === false ? (
                                      <p className="card-text">
                                        <button
                                          className="btn btn-outline-primary"
                                          onClick={() =>
                                            handleShowModal(appointment)
                                          }
                                        >
                                          Leave a Review{' '}
                                          <i
                                            className="fa fa-thumbs-up"
                                            aria-hidden="true"
                                          ></i>
                                        </button>
                                      </p>
                                    ) : appointment.status === 'Complete' &&
                                      appointment.reviewed === true ? (
                                      <p className="card-text">
                                        <button
                                          className="btn btn-outline-success"
                                          disabled
                                        >
                                          Reviewed!{' '}
                                        </button>
                                      </p>
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="no-appointments-message">
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
                                  Doctor: <strong>{comment.doctor}</strong>
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
                          <p>No reviews available.</p>
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
      {showModal && currentAppointment && (
        <ReviewModal
          show={true}
          handleCloseModal={handleCloseModal}
          handleSubmitData={handleSubmitReview}
        />
      )}
    </Container>
  )
}

export default Appointment
