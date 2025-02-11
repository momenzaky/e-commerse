import { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import Loader from '../../components/Loader/Loader';
import { FaTrashCan } from 'react-icons/fa6';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState(null);
  const { getLoggedCart, removeCartItem, updateProductQuantity, clearCart } = useContext(CartContext);

  async function getData() {
    let data = await getLoggedCart();
    setCartItems(data.data.cartItems);
    setCartData(data.data);
    console.log(data.data);
  }

  async function deleteProduct(productId) {
    let response = await removeCartItem(productId);
    setCartData(response.data);
  }

  async function updataProduct(productId, count) {
    let data = await updateProductQuantity(productId, count);
    setCartData(data.data);

  }

 


  useEffect(() => {
    getData();
  }, []);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartData ? (
        <>
          <div className='flex justify-between my-4'>
            <h4 className='text-2xl font-semibold'>Shopping Cart</h4>
            <h6>
              <span className='font-semibold'>
                Total Price:
              </span>
              {cartData?.totalCartPrice ? cartData.totalCartPrice : "0"} EGP
            </h6>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">Qty</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData?.products?.length > 0 ?
                  cartData.products.map((product) => (
                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img
                          src={product.product?.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={product.product?.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.product?.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button disabled={product.count === 1}
                            className="inline-flex disabled:cursor-not-allowed items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() => updataProduct(product.product?._id, product.count - 1)}
                          >
                            <span className="sr-only">Decrease Quantity</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <div>{product.count}</div>
                          <button
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() => updataProduct(product.product?._id, product.count + 1)}
                          >
                            <span className="sr-only">Increase Quantity</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => deleteProduct(product.product?._id)} className=" text-red-600 dark:text-red-500 hover:underline"><FaTrashCan className='text-2xl' /></button>
                      </td>
                    </tr>
                  ))
                  : "No Data Found"}
              </tbody>
            </table>
          </div>
          <button className='btn' >Clear</button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
