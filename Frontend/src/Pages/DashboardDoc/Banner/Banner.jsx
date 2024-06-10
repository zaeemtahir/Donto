import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Banner.css'
import brushMan from '../../../Images/brushman.png'
import HeroMainbg from '../../../Images/hero-main-bg.png'
import injectTool from '../../../Images/inject-tool.png'
import inject from '../../../Images/injection.png'
import staircaseMan from '../../../Images/staircase.png'
import axios from 'axios'

const Banner = () => {
  const [doctorName, setDoctorName] = useState('')
  const [profileImage, setProfileImage] = useState('')

  const getSingleDoctor = async () => {
    try {
      const doctorId = localStorage.getItem('doctorId')
      const response = await axios.get(
        `http://localhost:3000/api/v1/doctorProfile/${doctorId}`,
      )
      const jsonData = response.data.data
      setDoctorName(jsonData.name)
      setProfileImage(jsonData.profileUrl)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getSingleDoctor()
  }, [])

  return (
    <section className="banner-all text-white">
      <Container>
        <Row className="align-items-center">
          <Col md={6} lg={6} sm={12}>
            <div className="section-title">
              <h1>Welcome {doctorName}</h1>
              <img
                src={profileImage}
                alt="Doctor Profile"
                className="profile-image"
              />
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
