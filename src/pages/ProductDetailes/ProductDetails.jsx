import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';

export default function ProductDetails() {
  const { productId } = useParams();
  const { addToCart, setCartId, setNumOfCartItems ,addToWishList } = useContext(CartContext);
  const [likedProducts, setLikedProducts] = useState(new Set()); 
  const [details, setDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function addProduct(id) {
    try {
      const res = await addToCart(id);
      console.log(res);
      if (res.status === 'success') {
        setCartId(res.cartId);
        setNumOfCartItems(res.numOfCartItems);
        toast.success(res.message, { className: 'active' });
      }
    } catch (err) {
      console.error('Error adding product to cart', err);
      toast.error('Error adding product to cart');
    }
  }

  async function getProductDetails() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setDetails(response.data.data);
      const categoryId = response.data.data.category._id;
      getRelatedProducts(categoryId);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch product details');
      setLoading(false);
    }
  }

  async function getRelatedProducts(categoryId) {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
      setRelatedProducts(response.data.data);
    } catch (err) {
      setError('Failed to fetch related products');
      console.error(err);
    }
  }

  async function handleLikeClick(productId) {
    const updatedLikedProducts = new Set(likedProducts);
    if (updatedLikedProducts.has(productId)) {
      updatedLikedProducts.delete(productId); 
    } else {
      updatedLikedProducts.add(productId); 

      try {
        await addToWishList(productId); 
        toast.success('Added to wishlist', { className: 'active' });
      } catch (err) {
        console.error('Error adding product to wishlist', err);
        toast.error('Error adding product to wishlist');
      }
    }
    setLikedProducts(updatedLikedProducts); 
  }

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="row my-14 items-center">
        <div className="w-1/4 bg-red-200">
          <img src={details.imageCover} alt={details.title} className="w-full rounded" />
        </div>
        <div className="w-3/4 p-4">
          <div className="inner">
            <h2 className="font-bold">{details.title}</h2>
            <p className="text-gray-700 my-2 text-md">{details.description}</p>
            <small>{details.category?.name}</small>
            <div className="flex justify-between mt-3">
              <p>{details.price} EGP</p>
              <button className="btn w-full" onClick={() => addProduct(details.id)}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="row py-5 mt-5">
        <h2 className="text-2xl font-semibold text-green-600 my-5">Related Products</h2>

        <div className="flex flex-wrap">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
              <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
                <div className="inner product p-2 border border-transparent rounded-md">
                  <Link to={`/productDetails/${product.id}`} className="block">
                    <img src={product.imageCover} alt={product.title} className="w-full rounded" />
                  </Link>
                  <Link to={`/productDetails/${product.id}`} className="block mt-2">
                    <h5>{product.title}</h5>
                  </Link>
                  <div className="flex justify-between">
                    <p className="text-gray-700">{product.price} EGP</p>
                    <div className="flex items-center">
                      <span className="text-yellow-400"><FaStar /></span>
                      {product.ratingsAverage}
                    </div>
                  </div>
                  <div
                    className="text-l my-2 cursor-pointer"
                    onClick={() => handleLikeClick(product.id)} 
                  >
                    <FaHeart color={likedProducts.has(product.id) ? 'red' : 'gray'} /> 
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </section>
    </>
  );
}
