import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [message, setMessage] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate(); 

  const initialValues = {
    email: '',
  };

  async function handleForgotPassword(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        { email: values.email }
      );
      setMessage('Password reset link has been sent to your email.');
      setIsLoading(false);

      navigate('/verifyCode'); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending password reset email.');
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleForgotPassword,
  });

  return (
    <section className="bg-gray-50 w-1/2 mx-auto dark:bg-gray-900 my-5">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Forgot Password
      </h1>

      {message && <div className="bg-green-300 p-3 rounded-md my-2">{message}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-2 my-3 text-sm font-medium text-gray-900 dark:text-white">
            Please enter your email to receive a reset link
          </label>
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

        <button
          type="submit"
          className="text-white mt-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
        >
          {isLoading ? 'Loading...' : 'Send Reset Link'}
        </button>

        <div className="mt-5 cursor-pointer" onClick={() => navigate('/login')}>
          Back to Login
        </div>
      </form>
    </section>
  );
}
