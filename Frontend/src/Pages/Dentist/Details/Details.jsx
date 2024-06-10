import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import './Details.css'
import Banner from '../Bannner/Banner'

const Details = () => {
  const [doctors, setDoctors] = useState([])
  const [randomDoctor, setRandomDoctor] = useState(null)

  const getAllDoctors = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3000/api/v1/doctorsApproved',
      )
      const jsonData = res.data.data
      setDoctors(jsonData)
      if (jsonData.length > 0) {
        const randomIndex = Math.floor(Math.random() * jsonData.length)
        setRandomDoctor(jsonData[randomIndex])
      }
    } catch (error) {
      console.error('Error fetching doctors:', error)
    }
  }

  useEffect(() => {
    getAllDoctors()
  }, [])

  if (!randomDoctor) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Banner doctor={randomDoctor} />
      <section className="dentist-details-sec">
        <Container>
          <Row>
            <Col md={7} lg={8}>
              <div className="single-dentist-details">
                <h2>
                  {randomDoctor.name}{' '}
                  <span>({randomDoctor.qualification})</span>
                </h2>
                <p>
                  {randomDoctor.name} is a highly skilled and compassionate
                  dentist with over 20 years of experience in the field of
                  Orthodontics. Known for their gentle approach and dedication
                  to patient care, {randomDoctor.name} ensures each visit is as
                  comfortable and stress-free as possible. They stay updated
                  with the latest advancements in dental technology and
                  techniques, providing top-notch care for all their patients.
                  Whether it's a routine check-up or a complex dental procedure,
                  you can trust {randomDoctor.name} to prioritize your oral
                  health and well-being.
                </p>
                <p>
                  {randomDoctor.name} earned their degree from{' '}
                  {randomDoctor.qualification}, where they excelled in their
                  studies and developed a strong foundation in dental sciences.
                  Over the years, they have achieved numerous accolades,
                  including Recipient of the "Best Dentist" award in 2022 by the
                  American Dental Association, highlighting their commitment to
                  excellence and innovation in dentistry. Patients appreciate
                  their thorough approach, attention to detail, and the
                  personalized care they provide to each individual.{' '}
                  {randomDoctor.name} believes in building long-term
                  relationships with their patients, ensuring that every smile
                  they care for is healthy and beautiful
                </p>
              </div>
            </Col>
            <Col md={5} lg={4}>
              <div className="dentist-profile text-center">
                <div
                  className="profile-img"
                  style={{
                    backgroundImage: `url(${
                      randomDoctor.profileUrl ||
                      'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg'
                    })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'relative',
                    marginBottom: '35px',
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                    boxShadow: '8.135px 18.271px 40px 0 rgb(0 0 0 / 8%)',
                    height: '350px',
                    overflow: 'hidden',
                  }}
                ></div>
                <p>
                  Name: <strong>{randomDoctor.name}</strong>
                </p>
                <p>
                  Specialization: <strong>Orthodontics</strong>
                </p>
                <p>
                  Phone: <strong>+92 332-4755831</strong>
                </p>
                <div className="doctors-social">
                  <a href={randomDoctor.facebook}>
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href={randomDoctor.twitter}>
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href={randomDoctor.linkedin}>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="achivement-img-bg"></div>
            </Col>
            <Col lg={6}>
              <div className="expertDentist-txt mt-5 mt-lg-0">
                <h2>Experienced Dentist</h2>
                <p>
                  Meet {randomDoctor.name}, an experienced dentist dedicated to
                  transforming smiles and improving oral health. With over 20
                  years of expertise in the field, Dr. Watson combines her
                  passion for dentistry with a commitment to providing
                  exceptional care to her patients. Specializing in general and
                  cosmetic dentistry, she offers a comprehensive range of
                  services, from routine check-ups to advanced procedures
                </p>
                <p>
                  {randomDoctor.name} extensive experience allows her to tailor
                  treatment plans to meet each patient's unique needs and goals.
                  She stays at the forefront of dental innovations, utilizing
                  the latest techniques and technologies to deliver outstanding
                  results. Patients appreciate her gentle approach, attention to
                  detail, and ability to create comfortable and relaxing dental
                  experiences.
                </p>
                <p>
                  Committed to lifelong learning, {randomDoctor.name} regularly
                  attends continuing education courses and seminars to expand
                  her knowledge and skills. Her dedication to excellence has
                  earned her recognition among peers and patients alike."
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Details
