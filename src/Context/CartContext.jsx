import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

function addToCart(productId, token) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      { headers: { token } }
    )
    .then((response) => response.data)
    .catch((err) => err);
}
function addToWishList(productId, token) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      { headers: { token } }
    )
    .then((response) => response.data)
    .catch((err) => err);
}
function getLoggedCart(token) {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token }
    })
    .then((response) => response.data)
    .catch((err) => err);
}
function getLoggedWishList(token) {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token }
    })
    .then((response) => response.data)
    .catch((err) => err);
}
function removeCartItem(productId, token) {
  if (!token) {
    return Promise.reject("You are not logged in. Please log in to continue.");
  }

  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: { token }
    })
    .then((response) => response.data)
    .catch((err) => err.response ? err.response.data : { message: "An error occurred" });
}
function getUserOrders(productId, token) {
  if (!token) {
    return Promise.reject("You are not logged in. Please log in to continue.");
  }

  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: { token }
    })
    .then((response) => response.data)
    .catch((err) => err.response ? err.response.data : { message: "An error occurred" });
}
function removeWishListItem(productId, token) {
  if (!token) {
    return Promise.reject("You are not logged in. Please log in to continue.");
  }

  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: { token }
    })
    .then((response) => response.data)
    .catch((err) => err.response ? err.response.data : { message: "An error occurred" });
}
function updateProductQuantity(productId, count, token) {
  if (!token) {
    return Promise.reject("You are not logged in. Please log in to continue.");
  }

  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers: { token } }
    )
    .then((response) => response.data)
    .catch((err) => err.response ? err.response.data : { message: "An error occurred" });
}
function clearCart(token) {
  return axios
    .delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token }
    })
    .then((response) => response.data)
    .catch((err) => err);
}

export default function CartContextProvider({ children }) {
  const [cartId, setCartId] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token"));

  function cashOnDelivery(data) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, data, {
      headers: { token }
    }).then((response) => response.data)
      .catch((err) => err.response ? err.response.data : { message: "An error occurred" });
  }
  function onlinePayment(data) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        data,
        { headers: { token } }
      ).then((response) => response.data)
      .catch((err) => err.response ? err.response.data : { message: "An error occurred" });

  }

  useEffect(() => {
    if (token) {
      const getData = async () => {
        let res = await getLoggedCart(token);
        setCartId(res.cartId);
        setNumOfCartItems(res.numOfCartItems);
      };

      getData();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        addToCart: (productId) => addToCart(productId, token),
        getLoggedCart: () => getLoggedCart(token),
        removeCartItem: (productId) => removeCartItem(productId, token),
        updateProductQuantity: (productId, count) => updateProductQuantity(productId, count, token),
        clearCart: () => clearCart(token),
        numOfCartItems,
        setCartId,
        setNumOfCartItems,
        cashOnDelivery,
        onlinePayment,
        addToWishList: (productId) => addToWishList(productId, token),
        getLoggedWishList: () => getLoggedWishList(token),
        removeWishListItem: (productId) => removeWishListItem(productId, token),
        getUserOrders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
