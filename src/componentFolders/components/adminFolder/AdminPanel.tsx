import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import RegisteredUsers from './RegisteredUsers'

const AdminPanel = () => {
  return (
    <>
    <Navbar/>
    <RegisteredUsers/>
    <Footer/>
    </>
  )
}

export default AdminPanel