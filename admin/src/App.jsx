import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes from react-router-dom
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import DoctorApproval from "./doctorApproval";
import PatientManagement from "./patientManagement";
import Appointments from "./appointments";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />{" "}
          <Route path="/doctorApproval" element={<DoctorApproval />} />{" "}
          <Route path="/patientManagement" element={<PatientManagement />} />{" "}
          <Route path="/appointments" element={<Appointments />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
