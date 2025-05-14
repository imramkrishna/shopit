"use client"
import React from 'react'
import { CgProfile } from "react-icons/cg"
import { RiAdminFill } from "react-icons/ri";
import { MdLock } from "react-icons/md";
import { useState } from "react";
import Link from 'next/link';
import axios from "axios";
import { useAuth } from '@/context/authContext';


const Page = () => {
  const {login}=useAuth()
  const [formData, setFormData] = useState({
    email: "john.doe@example.com",
    phone: "1234567890"
  })
  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://sopitbackend.onrender.com/seller/login", formData);
      console.log(response.data);
      if (response.status === 202) {
         
         alert("Login successful")
        login(formData);
      } else {
        console.log("User not found...Invalid Credentials");
        alert("Invalid Credentials")
        
      }
    } catch (error) {
      console.error("Login failed:", error);
      
    }
  }
  return (

    <div className='fixed w-full min-h-screen h-screen bg-gradient-to-b from-[#cd90f5] to-[#c5ce9f] flex justify-center items-center'>

      <div className='flex justify-center gap-4 flex-col md:h-1/2 md:w-[40%] h-[60%] w-[90%]'>


        <div className="profile-logo flex justify-center items-center w-full">
          <hr className='text-white w-[50%]' /> <span className='text-6xl text-[#b182d0] rounded-full bg-white border-amber-50 justify-center items-center'><CgProfile /></span><hr className='text-white w-[50%]' />
        </div>
        <div className='w-full h-full'>
          <form className='w-full gap-4 flex flex-col h-full' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 justify-center items-center bg-white h-[80%] md:h-[90%] w-full'>
              <div className='border items-center  bg-[#cdcbce] h-[15%] md:h-[20%] w-[80%] border-gray-300 flex'>
                <span className='w-[15%] h-full flex bg-[#e8e6e7] justify-center items-center text-3xl'><RiAdminFill /></span>

                <input id='email' type="text" name='email' placeholder='Username' onChange={handleChange} value={formData.email} className='focus:outline-none w-full px-2 flex h-full' required />
              </div>
              <div className='border items-center bg-[#cdcbce] h-[15%] md:h-[20%]  w-[80%] border-gray-300 flex'>
                <span className='w-[15%] h-full text-3xl bg-[#e8e6e7] justify-center flex items-center'><MdLock /></span>

                <input type="password" name='phone' placeholder='Password' onChange={handleChange} value={formData.phone} className='focus:outline-none w-full flex px-2 h-full' required />
              </div>
              <div className='flex w-full h-[3%] justify-evenly'>
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" name='remember' /><span className='text-sm opacity-40'>Remember me</span>
                </div>
                <div className='text-sm flex items-center opacity-30'><Link href="/seller/passwordreset">Forgot Password?</Link></div>
              </div>
              <div>


              </div>

            </div>
            <div className='w-full bg-[#02264e] flex justify-center items-center h-[13%] md:h-[20%]'>
              <button type="submit" className='text-white'>Login as Seller</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}


export default Page;
