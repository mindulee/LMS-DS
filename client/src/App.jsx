import React from "react";

import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/About";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { CssBaseline } from '@mui/material';
//import { theme } from './theme';



import CourseList from "./Pages/Course/CourseList";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import CourseDescription from "./Pages/Course/CourseDescription";


import CreateCourse from "./Pages/Course/CreateCourse";
import Profile from "./Pages/User/Profile";
import Checkout from "./Pages/Payment/Checkout";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
import CheckoutFail from "./Pages/Payment/CheckoutFail";
import DisplayLecture from "./Pages/Dashboard/DisplayLecture";
import AddLecture from "./Pages/Dashboard/AddLecture";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import TeacherDashboard from "./Pages/Dashboard/TeacherDashboard";
import DisplayRequests from "./Pages/Dashboard/DisplayRequests";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

import TeacherRoute from './Components/TeacherRoute'
import AdminRoute from './Components/AdminRoute'
import UserRoute from './Components/UserRoute'

function App() {
  const { userInfo } = useSelector((state) => state.signIn)
  console.log('hi', userInfo)
  return (
    <>
      <ToastContainer />
      {/* <CssBaseline /> */}


      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        {userInfo ? (
          <Route path="/signup" element={<Navigate to="/" />} />
        ) :
          (<Route path="/signup" element={<Signup />} />
          )}

        {userInfo ? (
          <Route path="/login" element={<Navigate to="/" />} />
        ) :
          (<Route path="/login" element={<Login />} />
          )}



        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/description" element={<CourseDescription />} />


        <Route path="/course/create" element={<TeacherRoute><CreateCourse /></TeacherRoute>} />
        <Route path="/course/addlecture" element={<TeacherRoute><AddLecture /></TeacherRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/teacher/dashboard" element={<TeacherRoute><TeacherDashboard /></TeacherRoute>} />
        <Route path="/admin/requests" element={<AdminRoute><DisplayRequests /></AdminRoute>} />




        <Route path="/user/profile" element={<Profile />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/fail" element={<CheckoutFail />} />
        <Route path="/course/displaylectures" element={<DisplayLecture />} />


        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;
