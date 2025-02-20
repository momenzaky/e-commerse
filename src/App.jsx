import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './pages/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import Products from './pages/Product/Product';
import Register from './pages/Register/Register';
import CounterContextProvider from './Context/CounterContext';
import TokenContextProvider from './Context/TokenContext';
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes';
import Cart from './pages/Cart/Cart';
import Categories from './pages/Categories/Categories';
import ProductDetails from './pages/ProductDetailes/ProductDetails';
import NotFound from './pages/NotFound/NotFound';
import { Offline, Online } from "react-detect-offline";
import { CiWifiOff } from 'react-icons/ci';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CheckOut from './pages/CheckOut';
import AllOrders from './pages/AllOrders';
import Brand from './pages/Brands/Brand';
import WishList from './pages/WishList/WishList';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
import VerifyCode from './pages/VerifyCode/VerifyCode';
import UpdataPassword from './pages/UpdataPassword/UpdataPassword';



export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: 'wishList', element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
        { path: "productDetails/:productId", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
        { path: "brand", element: <ProtectedRoutes><Brand /></ProtectedRoutes> },
        { path: "allOrders", element: <ProtectedRoutes><AllOrders /></ProtectedRoutes> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verifyCode", element: <VerifyCode /> },
        { path: "updataPassword", element: <UpdataPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  const queryClient = new QueryClient(); 

  return (
    <QueryClientProvider client={queryClient}> 
      <TokenContextProvider>
        <CartContextProvider>
          <CounterContextProvider>
            <Offline>
              <div className='offline fixed bottom-2 right-4 bg-green-100 p-3 font-semibold rounded z-50'>
                <CiWifiOff className='inline mx-3 text-xl' />
                You Are Offline
              </div>
            </Offline>
            <Online>
              <div className='online fixed bottom-2 right-4 bg-blue-100 p-3 font-semibold rounded z-50'>
                You Are Online
              </div>
            </Online>
            <Toaster position='bottom-right' />
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider router={routes} />
          </CounterContextProvider>
        </CartContextProvider>
      </TokenContextProvider>
    </QueryClientProvider>
  );
}

