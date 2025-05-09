"use client"
import axios from "axios"
import { useEffect, useState } from "react"

function CartPage() {
  const [cartProducts, setCartProducts] = useState<any[]>([])

  useEffect(() => {
    // 1. Run once on mount
    const stored = localStorage.getItem("cartItems")
    const ids: string[] = stored ? JSON.parse(stored) : []
    console.log("Cart IDs:", ids)
    fetchApi(ids)
  }, []) // ← empty array runs effect only once

  const fetchApi = async (ids: string[]) => {
    try {
      const { data } = await axios.get("https://sopitbackend.onrender.com/seller/productList")
      if (!Array.isArray(data)) return
      // 2. Filter in one pass, not per-item push
      const filtered = data.filter((p: any) => ids.includes(p._id))
      setCartProducts(filtered)
      console.log("Cart products:", filtered)
    } catch (e) {
      console.error("Failed to load products:", e)
    }
  }

  return (
    <div className="p-4">
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartProducts.map(p => (
            <li key={p._id} className="border p-4 flex justify-between">
              <span>{p.productName}</span>
              <span className="font-bold">₹{p.productPrice}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default CartPage;