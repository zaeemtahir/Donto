import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import serviceDetailImg from '../../../Images/service-details-promo1.png'
import serviceDetailImg2 from '../../../Images/service-details-promo2.png'
import './Detail.css'

const Detail = () => {
  return (
    <>
      <section className="healing p-5">
        <Container>
          <Row className="align-items-center p-5">
            <Col lg={6} sm={12} xs={12}>
              <div className="expertDentist-txt mt-5 mt-lg-0">
                <h2 className="fw-bold">PRF For Faster Healing</h2>
                <p>
                  Platelet-Rich Fibrin (PRF) is a groundbreaking advancement in
                  dental and oral surgery that leverages the natural healing
                  properties of your own blood to accelerate recovery. By
                  concentrating platelets and growth factors from your blood,
                  PRF creates a fibrin matrix that enhances tissue regeneration
                  and reduces inflammation. This natural and effective treatment
                  significantly speeds up the healing process, making it an
                  excellent choice for procedures such as dental implants,
                  extractions, and gum surgery.
                </p>
                <p>
                  With PRF, patients experience not only faster healing times
                  but also improved outcomes with less discomfort and fewer
                  complications. The procedure is minimally invasive, involving
                  a simple blood draw followed by centrifugation to separate the
                  fibrin. This concentrated PRF is then applied directly to the
                  surgical site, promoting rapid tissue repair and regeneration.
                  Embrace the future of dental healing with PRF and enjoy a
                  quicker, smoother recovery that gets you back to your daily
                  life sooner.
                </p>
              </div>
            </Col>
            <Col lg={6} sm={12} xs={12}>
              <img
                src={serviceDetailImg}
                alt="expertDentist"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="healing p-5 footer-bg">
        <Container>
          <Row className="align-items-center p-5">
            <Col lg={6} sm={12} xs={12}>
              <img
                src={serviceDetailImg2}
                alt="expertDentist"
                className="img-fluid pt-xs-5"
              />
            </Col>
            <Col lg={6} sm={12} xs={12}>
              <div className="expertDentist-txt mt-5 mt-lg-0">
                <h2 className="fw-bold text-white">Composite or Mercury?</h2>
                <p className="text-white">
                  When it comes to dental fillings, patients often face the
                  choice between composite resin and mercury amalgam. Composite
                  fillings, made from a blend of plastic resins and fine glass
                  particles, offer a natural-looking solution that blends
                  seamlessly with your teeth. These fillings are not only
                  aesthetically pleasing but also bond directly to the tooth
                  structure, providing additional support and preserving more of
                  your natural tooth. They are an excellent choice for those
                  seeking a durable and discreet restoration, particularly for
                  visible areas like the front teeth.
                </p>
                <p className="text-white">
                  On the other hand, mercury amalgam fillings, known for their
                  strength and longevity, have been used in dentistry for over a
                  century. Made from a mixture of metals, including silver, tin,
                  and mercury, these fillings are highly durable and can
                  withstand significant chewing forces. However, some patients
                  are concerned about the potential health risks associated with
                  mercury exposure. While both types of fillings are effective,
                  the choice often comes down to personal preferences and
                  specific dental needs. Discuss with your dentist to determine
                  the best option for your oral health and peace of mind.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Detail
