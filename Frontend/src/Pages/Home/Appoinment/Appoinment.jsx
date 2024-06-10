import React, { useRef, useState } from 'react'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap'
import emailjs from 'emailjs-com'
import './Appoinment.css'

const Appointment = () => {
  const formRef = useRef()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formValues, setFormValues] = useState({
    User_name: '',
    User_email: '',
    User_phoneno: '',
    User_subject: '',
    message: '',
  })

  emailjs.init('BnKt_hiIBiWCri897')

  const sendEmail = (e) => {
    e.preventDefault()

    console.log('Form data:', formRef.current)

    emailjs
      .sendForm('service_0kmy5eq', 'template_yutmrcb', formRef.current)
      .then((result) => {
        console.log(result.text)
        setShowSuccessModal(true)
        resetForm()
      })
      .catch((error) => {
        console.log(error.text)
      })
  }

  const resetForm = () => {
    setFormValues({
      User_name: '',
      User_email: '',
      User_phoneno: '',
      User_subject: '',
      message: '',
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    resetForm()
  }

  return (
    <section className="appoinment-wrapper">
      <Container>
        <Row>
          <Col sm={12} md={12}>
            <div className="section-title">
              <h1 className="mt-5">General Inquiry Form</h1>
            </div>
            <div className="appoinment-form">
              <form ref={formRef} onSubmit={sendEmail} className="row">
                <Col md={6} lg={6}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="User_name"
                    value={formValues.User_name}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6} lg={6}>
                  <input
                    type="email"
                    placeholder="Email"
                    name="User_email"
                    value={formValues.User_email}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6} lg={6}>
                  <input
                    type="phone"
                    placeholder="Phone"
                    name="User_phoneno"
                    value={formValues.User_phoneno}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6} lg={6}>
                  <input
                    type="text"
                    placeholder="Subject"
                    name="User_subject"
                    value={formValues.User_subject}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={12} lg={12}>
                  <textarea
                    name="message"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Message"
                    value={formValues.message}
                    onChange={handleInputChange}
                  ></textarea>
                </Col>

                <Col md={12} className="text-center">
                  <button
                    type="submit"
                    className="theme-btn btn-fill form-btn mt-5"
                  >
                    Submit
                  </button>
                </Col>
              </form>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showSuccessModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Email sent successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default Appointment
