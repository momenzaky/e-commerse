import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { CartContext } from '../Context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CheckOut() {
    const { cashOnDelivery, setCartId, setNumOfCartItems, onlinePayment } = useContext(CartContext);
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state); 


    const initialValues = {
        details: '',
        phone: '',
        city: '',
    };

    const validationSchema = Yup.object({
        details: Yup.string().required('Details are required'),
        phone: Yup.string().required('Phone number is required'),
        city: Yup.string().required('City is required'),
    });

    async function handleSubmit(data) {
        if (state?.paymentMethod === "online") {
            let response = await onlinePayment({ shippingAddress: data });
            console.log(response);
            if (response.status === 'success') {
                window.location.href = response.session.url; 
            }
        } else {
            let response = await cashOnDelivery({ shippingAddress: data });
            console.log(response);
           
            if (response.data.status) {
                setCartId(null); 
                setNumOfCartItems(0); 
                navigate("/allOrders"); 
            }
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="bg-gray-50 w-1/2 mx-auto dark:bg-gray-900 my-5">
            <h5 className="text-xl font-bold mb-4 leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Check out
            </h5>
            <Helmet>
                <title>CheckOut</title>
            </Helmet>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        name="details"
                        id="details"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your details"
                        value={formik.values.details}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.details && formik.errors.details && <small className="text-red-600">{formik.errors.details}</small>}
                </div>

                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your phone"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone && <small className="text-red-600">{formik.errors.phone}</small>}
                </div>

                <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        name="city"
                        id="city"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your city"
                        value={formik.values.city}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.city && formik.errors.city && <small className="text-red-600">{formik.errors.city}</small>}
                </div>

                <button
                    type="submit"
                    className="text-white mt-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5  w-full py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                    disabled={!formik.isValid || formik.isSubmitting}
                >
                    Pay
                </button>
            </form>
        </div>
    );
}
