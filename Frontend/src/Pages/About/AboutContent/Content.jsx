import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Content.css'

const Content = () => {
  return (
    <section className="about-content-sec">
      <Container>
        <Row>
          <Col md={12} lg={{ order: 2 }} className="text-center">
            <div className="section-title">
              <h1>Our Dental Practice</h1>
            </div>
            <p className="w-50 m-auto content-inner">
              Welcome to Our Dental Practice, where every smile matters. With a
              commitment to excellence and a passion for oral health, we provide
              personalized care in a warm and inviting atmosphere. Your journey
              to a healthier, happier smile starts here.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Content
