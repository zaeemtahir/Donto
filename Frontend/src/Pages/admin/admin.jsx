import React, { useState } from 'react'
import { FaTooth, FaUserClock } from 'react-icons/fa'
import { BsPeopleFill } from 'react-icons/bs'
import { BsJustify } from 'react-icons/bs'
import { FaUserDoctor } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTooth, faUser } from '@fortawesome/free-solid-svg-icons'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './sidebar.css'
import './home.css'

function Header({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <span>
          <FontAwesomeIcon icon={faTooth} size="2x" /> DONTO
        </span>
      </div>
      <div className="header-le">
        <FontAwesomeIcon icon={faUser} className="icon" title="Dr. John Doe" />
      </div>
    </header>
  )
}

function Home() {
  const [appointments, setAppointments] = useState([
    {
      date: '2023-01-15',
      time: '10:00 AM',
      patient: 'John Doe',
      diseaseInfo: 'Toothache',
    },
    {
      date: '2023-02-22',
      time: '02:30 PM',
      patient: 'Jane Smith',
      diseaseInfo: 'Cavity',
    },
    // Add more appointment data as needed
  ])

  const addAppointment = () => {
    const newAppointment = {
      date: '2023-03-01',
      time: '09:15 AM',
      patient: 'Alice Johnson',
      diseaseInfo: 'Gum Bleeding',
    }

    setAppointments((prevAppointments) => [...prevAppointments, newAppointment])
  }

  const dentalData = [
    // ... (unchanged data)
  ]

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>HELLO "doctors name"</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PATIENTS</h3>
            <FaTooth className="card_icon" />
          </div>
          <h1>50</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>APPOINTMENTS</h3>
            <FaUserClock className="card_icon" />
          </div>
          <h1>20</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>STAFF</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>10</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={300}
            data={dentalData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="patients"
              fill="#0088FE"
              stroke="#0088FE"
            />
            <Area
              type="monotone"
              dataKey="appointments"
              fill="#00C49F"
              stroke="#00C49F"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="appointment-table">
        <h2>Appointment Information</h2>
        <button onClick={addAppointment}>Add Appointment</button>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient</th>
              <th>Disease Info</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patient}</td>
                <td>{appointment.diseaseInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? 'sidebar-responsive' : ''}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaUserDoctor className="icon_header" /> Doctors Portal
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Medical Records
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsPeopleFill className="icon" /> Personal Information
          </a>
        </li>
      </ul>
    </aside>
  )
}

export { Header, Home, Sidebar }
