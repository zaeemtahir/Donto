import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import expertDentist from '../../../Images/experienceddentist.png'
import './Dentist.css'

const Dentist = () => {
  return (
    <section className="expert-dentist">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <img
              src={expertDentist}
              alt="expertDentist"
              className="img-fluid"
            />
          </Col>
          <Col lg={6}>
            <div className="expertDentist-txt mt-5 mt-lg-0">
              <h2>Experienced Dentist</h2>
              <p>
                Step into our practice and experience the expertise of our
                seasoned dentist, whose years of dedication and passion for
                dentistry have culminated in a wealth of knowledge and skill.
                With a gentle touch and a commitment to excellence, our
                experienced dentist takes pride in providing comprehensive and
                personalized care to each and every patient.
              </p>
              <p>
                From the moment you walk through our doors, you'll be greeted by
                a warm and inviting atmosphere, where your comfort and
                well-being are our top priorities. Our experienced dentist takes
                the time to listen to your concerns, thoroughly evaluate your
                oral health needs, and create a tailored treatment plan designed
                to achieve optimal results.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Dentist
