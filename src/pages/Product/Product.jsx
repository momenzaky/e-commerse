import { Helmet } from 'react-helmet';
import style from './Product.module.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import Loader from '../../components/Loader/Loader';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [likedProducts, setLikedProducts] = useState(new Set()); 
  const { addToCart, addToWishList, setCartId, setNumOfCartItems } = useContext(CartContext);

  async function getProducts() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      setProductList(res.data.data);
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addProduct(id) {
    try {
      const res = await addToCart(id);
      if (res.status === "success") {
        setCartId(res.cartId);
        setNumOfCartItems(res.numOfCartItems);
        toast.success(res.message, { className: "active" });
      }
    } catch (err) {
      console.error('Error adding product to cart', err);
      toast.error('Error adding product to cart');
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
        toast.success("Added to wishlist", { className: "active" });
      } catch (err) {
        console.error('Error adding product to wishlist', err);
        toast.error('Error adding product to wishlist');
      }
    }
    setLikedProducts(updatedLikedProducts); 
  }

 
  function searchProduct(searchTerm) {
    const foundProducts = productList.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(foundProducts);
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
      setProducts(productList);
    }
  }, [searchTerm]);

  return (
    <div>
      <Helmet>
        <title>Product</title>
      </Helmet>

      <form className="max-w-md mx-auto my-6">
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
        {products.length > 0 ? (
          products.map((product) => (
            <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6" key={product.id}>
              <div className="inner product p-2 border border-transparent rounded-md">
                <Link to={`/productDetails/${product.id}`}>
                  <div className={style.productItem}>
                    <img src={product.imageCover} alt={product.title} className="w-full" />
                    <small className="text-green-600">{product.category?.name}</small>
                    <h5 className="font-s">
                      {product.title.slice(0, 20)}
                      {product.title.length > 20 && '...'}
                    </h5>
                    <div className="flex justify-between">
                      <p>{product.price} EGP</p>
                      <div className="flex items-center">
                        <span className="text-yellow-400"><FaStar /></span>
                        {product.ratingsAverage}
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="text-l my-2 cursor-pointer" onClick={() => handleLikeClick(product.id)}>
                  <FaHeart color={likedProducts.has(product.id) ? "red" : "gray"} />
                </div>

                <div className="btn" onClick={() => addProduct(product.id)}>
                  Add To Cart
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
