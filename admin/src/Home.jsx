import React, { useState, useEffect } from "react";
import { BsPeopleFill } from "react-icons/bs";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaTooth } from "react-icons/fa";
import "../src/home.css";
import { FaUserClock } from "react-icons/fa";
import axios from "axios";

function Home() {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [previousAppointmentCount, setPreviousAppointmentCount] = useState(0);
  const [currentAppointmentCount, setCurrentAppointmentCount] = useState(0);

  const getCount = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/admin");
    const {
      doctorCount,
      userCount,
      previousAppointmentCount,
      currentAppointmentCount,
    } = response.data.data;
    setDoctorCount(doctorCount);
    setPatientCount(userCount);
    setPreviousAppointmentCount(previousAppointmentCount);
    setCurrentAppointmentCount(currentAppointmentCount);
  };

  useEffect(() => {
    getCount();
  }, []);

  const dentalData = [
    {
      name: "Previous",
      patients: patientCount,
      appointments: previousAppointmentCount,
      staff: doctorCount,
    },
    {
      name: "Current",
      patients: patientCount,
      appointments: currentAppointmentCount,
      staff: doctorCount,
    },
  ];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>HELLO, Dr. Emily Carter</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>PATIENTS</h3>
            <FaTooth className="card_icon" />
          </div>
          <h1>{patientCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>APPOINTMENTS</h3>
            <FaUserClock className="card_icon" />
          </div>
          <h1>{currentAppointmentCount + previousAppointmentCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>STAFF</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{doctorCount}</h1>
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
    </main>
  );
}

export default Home;
