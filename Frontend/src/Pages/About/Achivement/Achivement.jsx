import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Achivement.css'

const Achivement = () => {
  return (
    <section className="achivement-wrap text-white">
      <Container>
        <Row className="align-items-center">
          <Col md={6} lg={6} sm={12}>
            <div className="section-title">
              <h1>Our Achievement</h1>
            </div>
            <div className="achivement-txt">
              <p className="w-75">
                Smiling comes naturally to Dr. Harrie, author of Smileopolis. He
                has embraced Cosmetic Dentistry and has redesigned the smiles
                for thev thousands of patients.
              </p>
              <div className="more-tool">
                <Link to="/login">
                  <button className="theme-btn btn-fill">Appointment</button>
                </Link>
                <a
                  href="https://youtu.be/dQw4w9WgXcQ?si=32Q0PEEq3tN8D5PK"
                  className="watchBtn"
                >
                  <button className="theme-btn btn-unfill">
                    <FontAwesomeIcon className="play-btn" icon={faPlayCircle} />
                    <span>Watch Video</span>
                  </button>
                </a>
              </div>
            </div>
          </Col>
          <Col md={6} lg={6} sm={12}>
            <Row className="achivement-funfact text-white">
              <Col sm={6} className="text-center">
                <div className="single-funfact">
                  <span>22 +</span>
                  <p>Patients</p>
                </div>
              </Col>
              <Col sm={6} className="text-center">
                <div className="single-funfact">
                  <span>75 +</span>
                  <p>Dentist</p>
                </div>
              </Col>
              <Col sm={6} className="text-center">
                <div className="single-funfact">
                  <span>25 +</span>
                  <p>Awards</p>
                </div>
              </Col>
              <Col sm={6} className="text-center">
                <div className="single-funfact">
                  <span>28 +</span>
                  <p>Branch</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Achivement
