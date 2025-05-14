"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface CartContextType {
  cartItems: string[]          
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<string[]>([])

  // load from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem("cartItems")
    if (saved) setCartItems(JSON.parse(saved))
  }, [])

  // sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (id: string) => {
    setCartItems(prev => {
      if (prev.includes(id)) return prev
      return [...prev, id]
    })
    alert("New Item added to cart")
  }

  const removeFromCart = async (id: string) => {
    setCartItems(prev => prev.filter(itemId => itemId !== id))
    await localStorage.setItem("cartItems",JSON.stringify(cartItems))
    const items=localStorage.getItem("cartItems")
    
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be inside a CartProvider") 
  return ctx
}
