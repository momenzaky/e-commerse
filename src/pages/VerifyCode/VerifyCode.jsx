import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'; 

export default function VerifyResetCode() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const initialValues = {
    resetCode: '',
  };

  const handleVerifyResetCode = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        {
          resetCode: values.resetCode,
        }
      );
      setMessage('Reset code verified successfully.');
      setIsLoading(false);

      navigate('/updataPassword'); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid or expired reset code.');
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    resetCode: Yup.string().required('Reset code is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleVerifyResetCode,
  });

  return (
    <section className="bg-gray-50 w-1/2 mx-auto dark:bg-gray-900 my-5">
      <Helmet>
        <title>Verify Reset Code</title>
      </Helmet>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Verify Reset Code
      </h1>

      {message && <div className="bg-green-300 p-3 rounded-md my-2">{message}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter your reset code
          </label>
          <input
            onChange={formik.handleChange}
            type="text"
            name="resetCode"
            id="resetCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Enter your reset code"
            value={formik.values.resetCode}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resetCode && formik.errors.resetCode && (
            <small className="text-red-600">{formik.errors.resetCode}</small>
          )}
        </div>

        <button
          type="submit"
          className="text-white mt-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
      </form>
    </section>
  );
}
