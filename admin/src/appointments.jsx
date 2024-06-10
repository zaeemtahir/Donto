import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/appointment"
      );
      const jsonData = response.data;
      setAppointments(jsonData.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);
  function formatDate(isoString) {
    return isoString.split("T")[0];
  }

  function formatStatus(appointmentDate, appointmentTime, status) {
    const currentDateTime = new Date();
    const appointmentDateString = formatDate(appointmentDate);
    const appointmentDateTime = new Date(
      `${appointmentDateString}T${appointmentTime}`
    );

    if (appointmentDateTime.getTime() > currentDateTime.getTime()) {
      if (status === "Paid") return "Paid / Upcoming";
      if (status === "Awaiting Payment") return "Awaiting / Upcoming";
      if (status === "pending") return "Pending / Upcoming";
    } else if (appointmentDateTime.getTime() < currentDateTime.getTime()) {
      if (status === "Paid") return "Paid / Expired";
      if (status === "Awaiting Payment") return "Awaiting / Expired";
      if (status === "pending") return "Pending / Expired";
    }

    return status;
  }
  return (
    <main className="main-container">
      <div className="appointment-table">
        <h2>Appointment Information</h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient's Name</th>
              <th>Doctor's Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{formatDate(appointment.appointmentDate)}</td>
                <td>{appointment.appointmentTime}</td>
                <td>
                  {appointment.firstName} {appointment.lastName}
                </td>
                <td>{appointment.doctor}</td>
                <td>
                  {formatStatus(
                    appointment.appointmentDate,
                    appointment.appointmentTime,
                    appointment.status
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Appointments;
