import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setMessage("Please login to view your orders.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        if (response.status === 200 && response.data.data) {
          setOrders(response.data.data);
        } else {
          setMessage("No orders found.");
        }
      } catch (error) {
        setMessage("Failed to fetch orders.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="bg-gray-50 w-1/2 mx-auto dark:bg-gray-900 my-5">
      <h1 className="text-xl font-bold mb-4 leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        All Orders
      </h1>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}

      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.isDelivered ? "Delivered" : "Not Delivered"}</p>
              <p>Paid: {order.isPaid ? "Yes" : "No"}</p>
              <p>Payment Method: {order.paymentMethodType}</p>
              <p>Total Order Price: {order.totalOrderPrice} EGP</p>
              <p>Shipping Price: {order.shippingPrice} EGP</p>
              <p>Tax Price: {order.taxPrice} EGP</p>
              <p>Order Created At: {new Date(order.createdAt).toLocaleDateString()}</p>

              {order.shippingAddress ? (
                <>
                  <h4 className="mt-2 font-semibold">Shipping Address</h4>
                  <p>Details: {order.shippingAddress.details || "Not available"}</p> 
                  <p>Phone: {order.shippingAddress.phone || "Not available"}</p> 
                  <p>City: {order.shippingAddress.city || "Not available"}</p> 
                </>
              ) : (
                <p>No shipping address available.</p>
              )}

              <h4 className="mt-2 font-semibold">Cart Items:</h4>
              <ul>
                {order.cartItems.length > 0 ? (
                  order.cartItems.map((item, index) => (
                    <li key={index} className="mt-1">
                      <p>Product: {item.productName || 'Product Name'}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {item.price} EGP</p>
                    </li>
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AllOrders;
