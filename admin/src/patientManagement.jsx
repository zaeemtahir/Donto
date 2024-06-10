import React, { useState, useEffect } from "react";
import "./doctorApproval.css";
import axios from "axios";
import Swal from "sweetalert2";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);

  const getAllPatients = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users");
      const jsonData = res.data.data;

      setPatients(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id, name) => {
    Swal.fire({
      title: `Are you sure you want to delete patient ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Delete Patient ${name}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
          getAllPatients();
          Swal.fire("Deleted!", `Patient ${name} has been deleted.`, "success");
        } catch (err) {
          console.log(err);
          Swal.fire(
            "Error!",
            "There was an issue deleting the patient.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <main className="main-container">
      <div className="appointment-table-2">
        <h2>All Patient's Data</h2>

        <table>
          <thead>
            <tr>
              <th>Patient's Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.gender}</td>
                <td>
                  <button
                    style={{ backgroundColor: "Red" }}
                    onClick={() => {
                      handleDelete(patient._id, patient.name);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PatientManagement;
