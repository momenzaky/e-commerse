import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';

export default function UpdatePassword() {
    const [message, setMessage] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    const initialValues = {
        currentPassword: '',
        password: '',
        rePassword: '',
    };

    const { setToken } = useContext(TokenContext);
    const handleUpdatePassword = async (values) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("User is not logged in.");
                setIsLoading(false);
                navigate("/login"); 
                return;
            }

            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = decodedToken.exp * 1000;
            const currentTime = Date.now();

            if (currentTime > expirationTime) {
                setMessage("Token has expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login"); 
                return;
            }

            const response = await axios.put(
                'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
                {
                    currentPassword: values.currentPassword,
                    password: values.password,
                    rePassword: values.rePassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            if (response.data.status === 'success') {
                setMessage('Password updated successfully.');

                setToken(response.data.token); 
                localStorage.setItem("token", response.data.token);

                setTimeout(() => {
                    navigate('/resetPassword');  
                }, 2000);
            } else {
                setMessage('Failed to update password.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to update password.');
        }
        setIsLoading(false);
    };

    const validationSchema = Yup.object({
        currentPassword: Yup.string()
            .required('Current password is required'),
        password: Yup.string()
            .required('New password is required')
            .matches(/^[A-Za-z1-9]{8,12}$/, 'Password must be between 8 and 12 characters'),
        rePassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleUpdatePassword,
    });

    return (
        <section className="bg-gray-50 w-1/2 mx-auto dark:bg-gray-900 my-5">
            <Helmet>
                <title>Update Password</title>
            </Helmet>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update Password
            </h1>

            {message && <div className="bg-green-300 p-3 rounded-md my-2">{message}</div>}

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Current Password
                    </label>
                    <input
                        onChange={formik.handleChange}
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder="Enter your current password"
                        value={formik.values.currentPassword}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.currentPassword && formik.errors.currentPassword && (
                        <small className="text-red-600">{formik.errors.currentPassword}</small>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Password
                    </label>
                    <input
                        onChange={formik.handleChange}
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder="Enter your new password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <small className="text-red-600">{formik.errors.password}</small>
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
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </section>
    );
}
