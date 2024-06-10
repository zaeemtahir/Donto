import React from 'react'

import Banner from '../Banner/Banner'
import Appointment from '../Appointment/Appointment'
import PatientDashboard from '../PatientDashBoard/PatientDashBoard'
const DashDisplay = () => {
  return (
    <>
      <Banner />
      <PatientDashboard />
      <Appointment />
    </>
  )
}

export default DashDisplay
