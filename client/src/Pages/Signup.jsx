import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { userSignUpAction } from '../Redux/actions/userAction';

const validationSchema = yup.object({
  firstName: yup
      .string('Enter your First Name')
      .min(3, 'First Name should be of minimum 3 characters length')
      .required('First Name is required'),
  lastName: yup
      .string('Enter your Last Name')
      .min(3, 'Last Name should be of minimum 3 characters length')
      .required('Last Name is required'),
  email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
  role: yup
      .string('Select your role')
      .required('Role is required'),
  password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
});


export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role:'',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      // Log the form values before submission
      console.log('Form values:', values);
  
      // Dispatch the userSignUpAction
      dispatch(userSignUpAction(values))
        .then(() => {
          // Reset the form if the action was successful
          actions.resetForm();
          navigate('/login');
        })
        .catch(error => {
          // Log any errors that occur during submission
          console.error('Error submitting form:', error);
        });
    }
  });
  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl"
        >
          <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter">
            Registration Page
          </h1>
          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-xl font-[500] text-blue-600 dark:text-white font-lato"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your first name..."
              className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-base-200 dark:text-base-200"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500">{formik.errors.firstName}</div>
            ) : null}
          </div>
          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-xl font-[500] text-blue-600 dark:text-white font-lato"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your last name..."
              className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-base-200 dark:text-base-200"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500">{formik.errors.lastName}</div>
            ) : null}
          </div>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xl font-[500] text-blue-600 dark:text-white font-lato"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email..."
              className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-base-200 dark:text-base-200"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          {/* Role */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-xl font-[500] text-blue-600 dark:text-white font-lato"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-base-200 dark:text-base-200"
            >
              <option value="">Select your role</option>
              <option value="0">Student</option>
              <option value="2">Teacher</option>
            </select>
            {formik.touched.role && formik.errors.role ? (
              <div className="text-red-500">{formik.errors.role}</div>
            ) : null}
          </div>
          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xl font-[500] text-blue-600 dark:text-white font-lato"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password..."
              className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-base-200 dark:text-base-200"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="bg-yellow-500 text-white font-[500] text-lg py-2 rounded-md hover:bg-yellow-300 transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            Create account
          </button>
        </form>
        {/* link */}
        <p className="text-center font-inter text-gray-500 dark:text-slate-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-lato cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </section>
    </Layout>
  );
}
