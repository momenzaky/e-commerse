import { Outlet } from 'react-router-dom'
import style from './MainLayout.module.css'
import React from 'react'
import Navbar from './../../components/Navbar/Navbar'
import Footer from './../../components/Footer/Footer'

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="container  ">
        <Outlet/>
      </div>
      <Footer />

    </div>
  )
}
