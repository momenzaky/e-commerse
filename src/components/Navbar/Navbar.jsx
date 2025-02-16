import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import style from "./Navbar.module.css";
import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from './../../assets/download.png';
import { CounterContext } from "../../Context/CounterContext";
import { TokenContext } from "../../Context/TokenContext";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { counter } = useContext(CounterContext);
  const { token, setToken } = useContext(TokenContext);
  const {numOfCartItems} = useContext(CartContext)
  const navigate = useNavigate()
  function logoutUser() {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/Login")
  }


  return (
    <nav className="bg-slate-100 border-gray-200 dark:bg-gray-900">
      <div className=" p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8 me-3 w-8" alt="FlowBite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white mx-2">FreshCart</span>
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className="hidden w-full  md:block " id="navbar-default">
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border  border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:flex md:justify-between">
              {token && (
                <div className="flex flex-col md:flex-row md:space-x-8">
                  <li>
                    <NavLink to="/" className="block py-2 px-3 text-white bg-green-700 rounded-sm md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500" aria-current="page">
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/products" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/categories" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Brands
                    </a>
                  </li>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:space-x-8 items-center">
                <li><a href="#" className="block py-2 px-3 text-white bg-green-700 rounded-sm md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"><FaInstagram /></a></li>
                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500"><FaFacebook /></a></li>
                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500"><FaTiktok /></a></li>
                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500"><FaTwitter /></a></li>
                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500"><FaLinkedin /></a></li>
                <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500"><FaYoutube /></a></li>
                {token && (
                  <>
                    <li>
                      <NavLink to="/cart" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 relative md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <FiShoppingCart className="text-xl font-semibold" />
                        <span className="absolute -top-3  -right-4 w-5 h-5 rounded-full flex justify-center items-center bg-green-500">{numOfCartItems}</span>
                      </NavLink>
                    </li>
                    <li>
                      <div
                        onClick={() => { logoutUser(); }}
                        className="cursor-pointer block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500"
                      >
                        Sign Out
                      </div>
                    </li>
                  </>

                )}

                {!token && (
                  <>
                    <li><NavLink to={'Login'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500">Login</NavLink></li>
                    <li><NavLink to={'Register'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500">Register</NavLink></li>
                  </>
                )}
              </div>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
}
