import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1000
}

export default function ProductDetails() {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  async function addProduct(id) {
    try {
      const res = await addToCart(id);
      console.log(res); 
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
  

 
  async function getProductDetails() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setDetails(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch product details');
      setLoading(false);
    }
  }

  

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='row my-14 items-center'>
      <div className="w-1/4 bg-red-200">
        <Slider {...settings}>
          {details.images?.map((img, i) => (
            <img src={img} key={i} alt={`product-image-${i}`} />
          ))}
        </Slider>
      </div>
      <Helmet>
        <title>{details.title}</title>
      </Helmet>
      <div className="w-3/4 p-4">
        <div className="inner">
          <h2 className='font-bold'>{details.title}</h2>
          <p className='text-gray-700 my-2 text-md'>{details.description}</p>
          <small>{details.category?.name}</small>
          <div className="flex justify-between mt-3">
            <p>{details.price} EGP</p>
            <div className="flex items-center">
              <span className="text-yellow-400"><FaStar /></span>
              {details.ratingsAverage}
            </div>
          </div>
          <button className="btn w-full" onClick={() => addProduct(details.id)}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
