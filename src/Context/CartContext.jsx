import axios from "axios";
import { Children, createContext } from "react";

export const CartContext = createContext()
const headers =  {
    token: localStorage.getItem("token"),
}
function addToCart(productId) {
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        { productId }, {
        headers,
    }
    )
    .then((response)=> response.data)
    .catch((err)=> err);
}

function getLoggedCart() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token"),  
      },
    })
    .then((response) => response.data)
    .catch((err) => err);
  }
  
  function removeCartItem(productId ) {
    const token = localStorage.getItem("token");
    
    if (!token) {
      return Promise.reject("You are not logged in. Please log in to continue.");
    }
  
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: {
        token: token,
      }
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error("Error removing item from cart:", err);
      return err.response ? err.response.data : { message: "An error occurred" };
    });
  }
  function updateProductQuantity(productId , count) {
    const token = localStorage.getItem("token");
    
    if (!token) {
      return Promise.reject("You are not logged in. Please log in to continue.");
    }
  
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count: count,
    } ,{
      headers: {
        token: token,
      }
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error("Error removing item from cart:", err);
      return err.response ? err.response.data : { message: "An error occurred" };
    });
  }
  
  function clearCart() {
    return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token"),  
      },
    })
    .then((response) => response.data)
    .catch((err) => err);
  }

export default function CartContextProvider({ children }) {
    return <CartContext.Provider value={{addToCart , getLoggedCart  ,removeCartItem , updateProductQuantity ,  clearCart }} >{children} </CartContext.Provider>
}