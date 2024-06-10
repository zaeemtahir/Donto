import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Banner.css'
import brushMan from '../../../Images/brushman.png';
import HeroMainbg from '../../../Images/hero-main-bg.png';
import injectTool from '../../../Images/inject-tool.png';
import inject from '../../../Images/injection.png';
import staircaseMan from '../../../Images/staircase.png';

const Banner = () => {


  return (
    <section className="banner-all text-white">
      <Container>
        <Row className="align-items-center">
          <Col md={6} lg={6} sm={12}>
              <div className="section-title"> 
                  <h1>Book Appointment</h1>
              </div>
             
          </Col>

          <Col md={6} lg={6} sm={12}>
              <div className="hero-slide-right text-start">
                  <div className="banner-animate">
                      <img src={HeroMainbg} alt="" className="img-fluid" />
                      <img src={staircaseMan} alt="" className="img-fluid a2" />
                      <img src={brushMan} alt="" className="img-fluid a3" />
                      <img src={inject} alt="" className="img-fluid a4" />
                      <img src={injectTool} alt="" className="img-fluid a5" />
                  </div>
              </div>
          </Col>

        </Row>
      </Container>
    </section>
  )
}

export default Banner
