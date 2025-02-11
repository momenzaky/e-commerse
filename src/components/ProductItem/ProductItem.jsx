import React from 'react';
import { FaStar } from 'react-icons/fa';
import style from './ProductItem.module.css';
import { Link } from 'react-router-dom';

export default function ProductItem({ product, addProduct }) {
  return (
    <div className='inner product p-2 border border-transparent rounded-md '>
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
      <div className='btn' onClick={() => addProduct(product.id)}>
        Add To Cart
      </div>
    </div>
  );
}

