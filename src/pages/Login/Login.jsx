import style from './Login.module.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {setToken} = useContext(TokenContext);
 
  
  const initialValues = {
    email: '',
    password: '',
  };

  async function handlelogin(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setErrorMessage(null);
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setIsLoading(false);

      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Za-z1-9]{8,12}$/, 'Password must be between 8 and 12 characters'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handlelogin,
  });

  return (
    
    <section className="bg-gray-50 w-1/2 mx-auto dark:bg-gray-900 my-5">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Login Now
      </h1>
      <Helmet>
                <title> Login</title>
            </Helmet>
      {errorMessage && <div className='bg-red-300 p-3 rounded-md my-2'>{errorMessage}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            onChange={formik.handleChange}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <small className="text-red-600">{formik.errors.password}</small>}
        </div>

        {isLoading ? (
          <button className="btn">Loading...</button>
        ) : (
          <button type="submit" className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" disabled={!formik.isValid}>
            Login
          </button>
        )}

        <small className="text-sm mt-2 font-light text-gray-500 dark:text-gray-400">
          Create a New Account <NavLink to="/Register">Register</NavLink>
        </small>
      </form>
    </section>
  );
}
