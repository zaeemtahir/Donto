import React, { useState, useEffect } from "react";
import "./doctorApproval.css";
import axios from "axios";
import Swal from "sweetalert2";

const DoctorApproval = () => {
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/doctors");
      const jsonData = res.data.data;

      setDoctors(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproval = async (id, name) => {
    Swal.fire({
      title: `Are you sure you want to approve ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`http://localhost:3000/api/v1/doctors/${id}`, {
            isApproved: "approved",
          });
          getAllDoctors();
          Swal.fire("Approved!", `${name} has been approved.`, "success");
        } catch (err) {
          console.log(err);
          Swal.fire(
            "Error!",
            "There was an issue approving the doctor.",
            "error"
          );
        }
      }
    });
  };

  const handleReject = async (id, name) => {
    Swal.fire({
      title: `Are you sure you want to reject ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, reject ${name}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`http://localhost:3000/api/v1/doctors/${id}`, {
            isApproved: "cancelled",
          });
          getAllDoctors();
          Swal.fire("Rejected!", `${name} has been rejected.`, "success");
        } catch (err) {
          console.log(err);
          Swal.fire(
            "Error!",
            "There was an issue rejecting the doctor.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <main className="main-container">
      <div className="appointment-table-2">
        <h2>Doctor's Approval</h2>

        <table>
          <thead>
            <tr>
              <th>Doctor's Name</th>
              <th>Email</th>
              <th>PMDC Number</th>
              <th>CNIC Number</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.pmdcNumber}</td>
                <td>{doctor.cnic}</td>
                <td>
                  {doctor.isApproved === "pending" ? (
                    <>
                      <button
                        style={{ backgroundColor: "green" }}
                        onClick={() => handleApproval(doctor._id, doctor.name)}
                      >
                        Approve
                      </button>
                      <button
                        style={{ backgroundColor: "Red" }}
                        onClick={() => handleReject(doctor._id, doctor.name)}
                      >
                        Reject
                      </button>
                    </>
                  ) : doctor.isApproved === "cancelled" ? (
                    <button style={{ backgroundColor: "Red" }} disabled>
                      Rejected
                    </button>
                  ) : (
                    <button style={{ backgroundColor: "green" }} disabled>
                      Approved
                    </button>
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

export default DoctorApproval;
