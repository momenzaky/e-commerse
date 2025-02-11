import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export default function LatestProduct() {
  const [products, setProducts] = useState([]); 
  const { addToCart } = useContext(CartContext); 

  
  async function getProducts() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      setProducts(res.data.data); 
    } catch (err) {
      console.log(err);
    }
  }

  async function addProduct(id) {
    try {
      const res = await addToCart(id); 
      if (res.status === "success") {
        toast.success(res.message, {
          className: "active",
        });
      }
    } catch (err) {
      console.error('Error adding product to cart', err);
      toast.error('Error adding product to cart');
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="row justify-center">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6" key={product.id}>
            <ProductItem product={product} addProduct={addProduct} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
