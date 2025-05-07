"use client"
import React, { useEffect } from 'react'
import { useCart } from '@/context/cartContext'

const page = () => {
     const {cartItems}=useCart();
     console.log(cartItems)
  return (
    <div>
        {cartItems.map((index,item)=>(
            <div>
                {item}
            </div>
        ))}
      
    </div>
  )
}

export default page
