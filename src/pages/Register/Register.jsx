import { useFormik } from 'formik';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  };

  async function handleRegister(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setErrorMessage(null);
      setIsLoading(false);
      navigate("/Login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').max(20).min(2),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Za-z1-9]{8,12}$/, 'Password must be between 8 and 12 characters'),
    rePassword: Yup.string()
      .required('Re-password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Invalid phone number format'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <section className="bg-gray-50 w-1/2 mx-auto dark:bg-gray-900 my-5">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Register Now
      </h1>
      <Helmet>
                <title> Register</title>
            </Helmet>
      {errorMessage && <div className='bg-red-300 p-3 rounded-md my-2'>{errorMessage}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input
            onChange={formik.handleChange}
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Enter your name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <small className="text-red-600">{formik.errors.name}</small>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            onChange={formik.handleChange}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Enter your email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <small className="text-red-600">{formik.errors.email}</small>}
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Enter your password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <small className="text-red-600">{formik.errors.password}</small>}
        </div>

        <div>
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
          <input
            onChange={formik.handleChange}
            type="password"
            name="rePassword"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Enter your rePassword"
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && formik.errors.rePassword && <small className="text-red-600">{formik.errors.rePassword}</small>}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Enter your phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && <small className="text-red-600">{formik.errors.phone}</small>}
        </div>

        {isLoading ? (
          <button className="text-white mt-2 bg-green-700 disabled:bg-green-200 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Loading...</button>
        ) : (
          <button type="submit" className="text-white mt-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800" disabled={!formik.isValid}>
            Register
          </button>
        )}

        <small className="text-sm mt-2 font-light text-gray-500 dark:text-gray-400">
          Already have an account? <NavLink to="/Login">Login</NavLink>
        </small>
      </form>
    </section>
  );
}
