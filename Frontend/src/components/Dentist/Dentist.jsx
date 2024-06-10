import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FakeDoctors } from '../../FakeData/Dentist'
import Doctors from '../../Pages/Home/Doctors/Doctors'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Dentist = () => {
  const [doctors, setDoctors] = useState([])

  const getAllDoctors = async () => {
    const res = await axios.get('http://localhost:3000/api/v1/doctorsApproved')
    const jsonData = res.data.data
    setDoctors(jsonData)
  }
  useEffect(() => {
    getAllDoctors()
  }, [])
  return (
    <section className="doctor-wrapper">
      <Container>
        <Row>
          <Col sm={12}>
            <div className="section-title">
              <h1 className="mb-5 mb-sm-dent">Our Dentists</h1>
            </div>
          </Col>
        </Row>
        <Row>
          {doctors.map((dentist) => (
            <Doctors key={dentist._id} dentist={dentist} />
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Dentist
