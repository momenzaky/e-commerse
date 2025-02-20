import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export default function UpdatePassword() {
    const [message, setMessage] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        newPassword: '',
        rePassword: '',
    };

    const handleUpdatePassword = async (values) => {
        setIsLoading(true);
        try {
            if (!values.email || !values.newPassword) {
                setMessage("Email and new password are required.");
                setIsLoading(false);
                return;
            }
    
            if (values.newPassword !== values.rePassword) {
                setMessage("Passwords do not match.");
                setIsLoading(false);
                return;
            }
    
            const response = await axios.put(
                'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
                {
                    email: values.email,
                    newPassword: values.newPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                }
            );
    
            console.log('Response data:', response.data);
    
            if (response.data.status === 'success') {
                setMessage('Password reset successfully.');
                setIsLoading(false);
    
                setTimeout(() => {
                    navigate('/login');
                }, 1000); 
    
                return; 
            } else {
                setMessage(response.data.message || "Failed to reset password.");
            }
        } catch (error) {
            if (error.response) {
                console.error("Error Response:", error.response);
                setMessage(error.response.data.message || 'Failed to reset password.');
            } else {
                console.error("Error:", error.message);
                setMessage("An error occurred: " + error.message);
            }
        }
        setIsLoading(false);
    };
    
    
    
    

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        newPassword: Yup.string()
            .required('New password is required')
            .matches(/^[A-Za-z1-9]{8,12}$/, 'Password must be between 8 and 12 characters'),
        rePassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleUpdatePassword,
    });

    return (
        <section className="bg-gray-50 w-1/2 mx-auto dark:bg-gray-900 my-5">
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Reset Password
            </h1>

            {message && <div className="bg-green-300 p-3 rounded-md my-2">{message}</div>}

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
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
                    {formik.touched.email && formik.errors.email && (
                        <small className="text-red-600">{formik.errors.email}</small>
                    )}
                </div>

                <div>
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Password
                    </label>
                    <input
                        onChange={formik.handleChange}
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder="Enter your new password"
                        value={formik.values.newPassword}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                        <small className="text-red-600">{formik.errors.newPassword}</small>
                    )}
                </div>

                <div>
                    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm Password
                    </label>
                    <input
                        onChange={formik.handleChange}
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder="Confirm your new password"
                        value={formik.values.rePassword}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.rePassword && formik.errors.rePassword && (
                        <small className="text-red-600">{formik.errors.rePassword}</small>
                    )}
                </div>

                <button
                    type="submit"
                    className="text-white mt-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >
                    {isLoading ? 'Updating...' : 'Reset Password'}
                </button>
            </form>
        </section>
    );
}
