import { useContext, useState } from 'react';  
import { FaHeart, FaStar } from 'react-icons/fa';
import style from './ProductItem.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext'; 

export default function ProductItem({ product, addProduct }) {
  const [isLiked, setIsLiked] = useState(false);        
  
  const { addToWishList: addToWishListFromContext } = useContext(CartContext); 

  const handleLikeClick = () => {
    setIsLiked(!isLiked);  
    if (!isLiked) {
      addToWishListFromContext(product.id); 
    }
  };

  return (
    <div className='inner product p-2 border border-transparent rounded-md'>
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
      <div className={"text-l my-2 cursor-pointer"} onClick={handleLikeClick}>
        <FaHeart color={isLiked ? "red" : "gray"} />  
      </div>
      <div className='btn' onClick={() => addProduct(product.id)}>
        Add To Cart
      </div>
    </div>
  );
}
