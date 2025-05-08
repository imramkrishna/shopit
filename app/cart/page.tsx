"use client"
import React, { useEffect } from 'react'
const page = () => {
     useEffect(()=>{
      const cartItems=localStorage.getItem("cartItems")
      if(cartItems){
      const item=JSON.parse(cartItems)
      console.log("Cart Items are : ",cartItems)
      console.log(cartItems.length)
      }
      return;
     })
    
     
  return (
    <div>
    </div>
  )
}

export default page
