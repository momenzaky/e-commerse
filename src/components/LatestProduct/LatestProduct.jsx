import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import Loader from '../Loader/Loader'

export default function LatestProduct() {
const [product, setProduct] = useState({})
async function getProducts(){
await axios.get("https://ecommerce.routemisr.com/api/v1/products").then((res)=>{
  setProduct(res.data.data);
  
}).catch((err)=>{
console.log(err);

})
}

useEffect(() => {
 getProducts()
}, [])


  return (
    <div className='row justify-center'>
      {product.length > 0 ? product.map((product) => (
        <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6' key={product.id}>
         {console.log(product)}
         

         <ProductItem product={product} />


        </div>) ) : <Loader/>}
    </div>
  )
}
