import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaTrashCan } from 'react-icons/fa6';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';

export default function WishList() {
    const [cartItems, setCartItems] = useState([]);
    const [cartData, setCartData] = useState(null);
    const navigate = useNavigate();
    const { getLoggedWishList, addToCart, removeWishListItem, setCartId, setNumOfCartItems } = useContext(CartContext);

    async function getData() {
        let data = await getLoggedWishList();
        console.log(data);
        setCartItems(data.data);
        setCartData(data.data);
    }

    async function deleteProduct(productId) {
        try {
            const res = await removeWishListItem(productId);
            console.log(res);
            
            const updatedWishlist = await getLoggedWishList();
            setCartData(updatedWishlist.data);  
            setCartId(res.cartId);  
        } catch (err) {
            console.error('Error removing product from wishlist', err);
            toast.error('Error removing product from wishlist');
        }
    }
    
    async function addProduct(productId) {
        try {
            const res = await addToCart(productId);
            console.log(res);
    
            if (res.status === "success") {
                setCartId(res.cartId);  
                setNumOfCartItems(res.numOfCartItems);  
                toast.success(res.message, {
                    className: "active",
                });
    
                const removeRes = await removeWishListItem(productId);
                console.log(removeRes);
    
                const updatedWishlist = await getLoggedWishList();
                setCartData(updatedWishlist.data);  
                setCartId(removeRes.cartId);  
                setNumOfCartItems(removeRes.numOfCartItems); 
            }
        } catch (err) {
            console.error('Error adding product to cart', err);
            toast.error('Error adding product to cart');
        }
    }
    
    

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Helmet>
                <title>WishList</title>
            </Helmet>
            {cartData ? (
                <>
                    <h4 className='text-2xl font-semibold text-green-600'>My Wish List</h4>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            </thead>
                            <tbody>
                                {cartData.length > 0 ? (
                                    cartData.map((product, index) => (
                                        <tr key={product._id || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="p-4">
                                                <img
                                                    src={product.imageCover}
                                                    className="w-16 md:w-32 max-w-full max-h-full"
                                                    alt={product.title}
                                                />
                                            </td>
                                            <td>
                                                <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.title}</div>
                                                <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price} EGP</div>
                                                <div
                                                    className="text-red-600 dark:text-red-500 hover:underline"
                                                    onClick={() => deleteProduct(product._id)}
                                                >
                                                    <FaTrashCan className="text-xl ms-7 cursor-pointer" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"></td>
                                            <td className="px-6 py-4">
                                                <button className='btn' onClick={() => addProduct(product._id)}>
                                                    Add to Cart
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">No Data Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
}
