import React from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
} from "react-icons/bs";
import {
  FaUserDoctor,
  FaUserTie,
  FaUserInjured,
  FaCalendar,
} from "react-icons/fa6";
import "./sidebar.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaUserTie className="icon_header" /> Admin Portal
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/appointments">
            <FaCalendar className="icon" /> Appointments
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="/doctorApproval">
            <FaUserDoctor className="icon" /> Doctor's Approval
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/patientManagement">
            <FaUserInjured className="icon" /> Patient Management
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
