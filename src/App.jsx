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

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        {
          path: 'cart',
          element: <ProtectedRoutes><Cart /></ProtectedRoutes>,
        },
        { path: "productDetails/:productId", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <TokenContextProvider>
      <CartContextProvider>
        <CounterContextProvider>
          <Offline>
            <div className='offline fixed bottom-2 right-4 bg-green-100 p-3 font-semibold rounded z-50'>
              <CiWifiOff className='inline mx-3 text-xl' />
              You Are Offline
            </div>
          </Offline>
          <Toaster position='bottom-right' />
          <RouterProvider router={routes} />
        </CounterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  );
}
