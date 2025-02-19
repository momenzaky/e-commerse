import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export default function LatestProduct() {
  const [products, setProducts] = useState([]);
  const { addToCart , setCartId , setNumOfCartItems } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); 
  
  async function getProducts() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      setProducts(res.data.data); 
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); 
    }
  }

  
  async function addProduct(id) {
    try {
      const res = await addToCart(id);
      if (res.status === "success") {
        setCartId(res.cartId);
        setNumOfCartItems(res.numOfCartItems);
        toast.success(res.message, {
          className: "active",
        });
      }
    } catch (err) {
      console.error('Error adding product to cart', err);
      toast.error('Error adding product to cart');
    }
  }
  async function addToWishList(id) {
    try {
      const res = await addToWishList(id);
      if (res.status === "success") {
        setCartId(res.cartId);
        setNumOfCartItems(res.numOfCartItems);
        toast.success(res.message, {
          className: "active",
        });
      }
    } catch (err) {
      console.error('Error adding product to cart', err);
      toast.error('Error adding product to cart');
    }
  }

  
  function searchProduct(searchTerm) {
    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value); 
  }

  useEffect(() => {
    getProducts();
  }, []); 

  useEffect(() => {
    if (searchTerm.length > 0) {
      searchProduct(searchTerm); 
    } else {
      getProducts(); 
    }
  }, [searchTerm]);

  return (
    <>
      <form className="max-w-md mx-auto my-10 ">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input 
            type="search" 
            id="default-search" 
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
            placeholder="Search products..." 
            required 
            value={searchTerm} 
            onChange={handleSearch} 
          />
        </div>
      </form>
      
      <div className="row justify-center">
        {loading ? (
          <Loader /> 
        ) : products.length > 0 ? (
          products.map((product) => (
            <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6" key={product.id}>
              <ProductItem product={product} addProduct={addProduct}   addToWishList={addToWishList} />
            </div>
          )) 
        ) : (
          <p>No products found</p> 
        )}
      </div>
    </>
  );
}
