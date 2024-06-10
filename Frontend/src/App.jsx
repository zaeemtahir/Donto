import React, { useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './Pages/About/About/About.jsx'
import Approved from './Pages/Approved/Approved.jsx'
import Contact from './Pages/Contact/Contact/Contact.jsx'
import Dentist from './Pages/Dentist/Denitst/Dentist.jsx'
import Footer from './Pages/Home/Footer/Footer.jsx'
import Header from './Pages/Home/Header/Header.jsx'
import Home from './Pages/Home/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import NotFound from './Pages/NotFound/NotFound.jsx'
import Service from './Pages/Services/Service/Service.jsx'
import DashDisplay from './Pages/DashBoardPatient/DashDisplay/DashDisplay.jsx'
import Doctor from './Pages/DashboardDoc/DoctorDash/DoctorDash.jsx'
import ForgotPasswordPage from '../src/Pages/forgotpassword/forgotpass.jsx'
import { ServiceProvider } from '../src/FakeData/ServiceContext.jsx'
import SignupPage from './Pages/signup/signup.jsx'
import DocSignupPage from './Pages/signup/doc-signup.jsx'
import PaymentPage from './Pages/DashBoardPatient/Payment/payment.jsx'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
// import { useHistory } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

export const AboutFocus = [
  {
    id: '001',
    title: 'Consolation',
    description:
      'Lorem Ipsum is simply is very dummy text of the printings and type and setting for content',
    img: 'https://i.ibb.co/GQmKHnh/heart.png',
  },
  {
    id: '002',
    title: 'Familiarity',
    description:
      'Get our text demo is simply dummy text of the printings and type and setting for content',
    img: 'https://i.ibb.co/N2M8n97/love.png',
  },
  {
    id: '003',
    title: 'Outcome',
    description:
      'Lorem Ipsum is simply is very dummy text of the printings and type setting for content',
    img: 'https://i.ibb.co/t2cczRh/outcome.png',
  },
]

function App() {
  const contextValue = {
    serviceData: AboutFocus,
  }

  const [isLogged, setIsLogged] = useState(
    !!(localStorage.getItem('userId') || localStorage.getItem('doctorId')),
  )

  console.log('IS LOGGED: ', isLogged)

  const login = async (email, password) => {
    console.log(email, password)
    try {
      const res = await axios.post(`http://localhost:3000/api/v1/auth/login`, {
        email,
        password,
      })

      console.log(res)

      // console.log('Email:', res.data.data.email)
      // console.log('email:', res.data.data.password)

      if (res.status === 200) {
        if (res.data.role === 'doctor') {
          localStorage.setItem('doctorId', res.data.data._id)
          localStorage.setItem('doctorName', res.data.data.name)
        }
        if (res.data.role === 'patient') {
          console.log(res.data.role)
          localStorage.setItem('userId', res.data.data._id)
        }
      }
      return true
      setIsLogged(true)
    } catch (error) {
      toast.error('Invalid email or password', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      return false
    }
  }

  return (
    <div className="App">
      <Router>
        {/* <isLoggedContext.Provider value={isLogged}> */}
        <Header isLogged={isLogged} setIsLogged={setIsLogged} />
        <ServiceProvider value={contextValue}>
          <Routes>
            <Route path="/" element={<Home isLogged={isLogged} />} />
            <Route path="/home" element={<Home isLogged={isLogged} />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/dentist" element={<Dentist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/approved" element={<Approved />} />

            <Route
              path="/login"
              element={<Login setIsLogged={setIsLogged} />}
            />
            {/* doctorsdash */}
            <Route path="/doctorDash" element={<Doctor />} />
            {/* patient */}
            <Route path="/DashDisplay" element={<DashDisplay />} />
            <Route path="/Payment" element={<PaymentPage />} />
            <Route path="/SignupPage" element={<SignupPage />}></Route>
            <Route path="/DocSignupPage" element={<DocSignupPage />}></Route>
            <Route
              path="/ForgotPasswordPage"
              element={<ForgotPasswordPage />}
            ></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ServiceProvider>
        <Footer />
        {/* </isLoggedContext.Provider> */}
      </Router>
    </div>
  )
}

export default App
