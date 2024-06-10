import AOS from 'aos'
import 'aos/dist/aos.css'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import donto from '../../../Images/about-banner1.png'
import dontoAnimated from '../../../Images/cleaner.png'
import './About.css'

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    })
    AOS.refresh()
  }, [])
  return (
    <section className="about-wrapper">
      <Container>
        <Row>
          <Col md={12} lg={6}>
            <div className="about-left">
              <img src={donto} alt="donto" className="img-fluid donto" />
              <img
                src={dontoAnimated}
                alt="donto"
                className="img-fluid animated dontoAnim"
              />
            </div>
          </Col>
          <Col md={12} lg={6}>
            <div className="about-right mt-5 mt-lg-0">
              <div className="about-content text-start" data-aos="zoom-in">
                <h1>Welcome to a Family</h1>
                <p>
                  Welcome to Donto! Step into a world of personalized care and
                  exceptional service. We're delighted to have you here, and
                  we're committed to ensuring your visit is comfortable,
                  informative, and tailored to your needs. Let's embark on your
                  journey to a brighter, healthier smile together!
                </p>
                <a href="/about">About Us</a>
              </div>
              <div className="fun-fact-sec" data-aos="fade-right">
                <div className="single-fun">
                  <span>500</span>
                  <span>+</span>
                  <p>Happy Patients</p>
                </div>
                <div className="single-fun sp-fun" data-aos="fade-right">
                  <span>88</span>
                  <span>+</span>
                  <p>Qualified Doctors</p>
                </div>
                <div className="single-fun" data-aos="fade-left">
                  <span>25</span>
                  <span>+</span>
                  <p>Years Experience</p>
                </div>
                <div className="single-fun sp-fun" data-aos="fade-left">
                  <span>50</span>
                  <span>+</span>
                  <p>Dental Awards</p>
                </div>
                <span className="line"></span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About
