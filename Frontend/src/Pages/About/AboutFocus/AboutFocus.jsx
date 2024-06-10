import React from 'react'
import { Col } from 'react-bootstrap'
import { useService } from '../.././././././../FakeData/ServiceContext'

const Services = () => {
  const { title, description, img } = useService()

  return (
    <>
      <Col md={6} lg={6} xl={4} xs={12}>
        <div className="single-service-box focus">
          <div className="service-icon">
            <img src={img} alt="" />
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Col>
    </>
  )
}

export default Services
