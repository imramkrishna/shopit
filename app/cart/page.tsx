"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import { FaSpinner } from "react-icons/fa"
import { useCart } from "@/context/cartContext"

export default function CartPage() {
  const { removeFromCart } = useCart()
  const [cartProducts, setCartProducts] = useState<any[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("cartItems") ?? "[]"
    const ids: string[] = JSON.parse(stored)
    fetchApi(ids)
  }, [])

  const fetchApi = async (ids: string[]) => {
    setLoading(true)
    if (ids.length === 0) {
      setCartProducts([])
      setQuantities({})
      setLoading(false)
      return
    }

    try {
      const { data } = await axios.get(
        "https://sopitbackend.onrender.com/seller/productList"
      )
      if (!Array.isArray(data)) {
        setLoading(false)
        return
      }

      const filtered = data.filter((p: any) => ids.includes(p._id))
      setCartProducts(filtered)

      const initialQty: Record<string, number> = {}
      filtered.forEach(p => {
        initialQty[p._id] = 1
      })
      setQuantities(initialQty)
    } catch (e) {
      console.error("Failed to load cart products:", e)
    } finally {
      setLoading(false)
    }
  }

  const increase = (id: string) =>
    setQuantities(q => ({ ...q, [id]: q[id] + 1 }))
  
  const decrease = (id: string) =>
    setQuantities(q => ({ ...q, [id]: Math.max(1, q[id] - 1) }))

  const handleRemoveItem = async (id: string) => {
    setIsRemoving(id)
    try {
      removeFromCart(id)
      // Instead of reloading the page, update the state directly
      setCartProducts(prev => prev.filter(p => p._id !== id))
      setQuantities(prev => {
        const { [id]: _, ...rest } = prev
        return rest
      })
    } catch (e) {
      console.error("Error removing item:", e)
    } finally {
      setIsRemoving(null)
    }
  }

  const subtotal = cartProducts.reduce((sum, p) => {
    const qty = quantities[p._id] || 1
    return sum + Number(p.productPrice) * qty
  }, 0)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate API call with timeout
    setTimeout(() => {
      localStorage.removeItem("cartItems")
      setCartProducts([])
      setIsCheckingOut(false)
      alert("Thank you for your purchase!")
    }, 1500)
  }

  // Full page loading state
  if (loading) {
    return (
      <div className="pt-24 px-4 flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
          <div className="flex justify-center mb-4">
            <FaSpinner className="animate-spin text-teal-600 h-10 w-10" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading your cart</h2>
          <p className="text-gray-600">Please wait while we prepare your shopping experience...</p>
          
          {/* Skeleton loaders */}
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="bg-gray-200 w-16 h-16 rounded-md"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold my-6 sm:my-8">Your Shopping Cart</h1>
      
      {cartProducts.length === 0 ? (
        <div className="text-center text-gray-600 py-16 sm:py-20 bg-white rounded-lg shadow">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <p className="mt-2 mb-4">Your cart is empty.</p>
          <a
            href="/"
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          {/* Desktop View - Grid Layout */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-4 bg-gray-50 px-6 py-3 font-semibold border-b">
              <div>Image</div>
              <div>Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
              <div className="text-center">Actions</div>
            </div>

            {/* Items */}
            {cartProducts.map(p => (
              <div
                key={p._id}
                className="grid grid-cols-6 gap-4 items-center px-6 py-4 border-b last:border-b-0"
              >
                {/* Product Image */}
                <div className="h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                  {p.productImages ? (
                    <img
                      src={p.productImages}
                      alt={p.productName}
                      className="object-cover h-full w-full"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://via.placeholder.com/100x100?text=No+Image")
                      }
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <div className="text-gray-800">{p.productName}</div>

                {/* Unit Price */}
                <div className="text-center text-teal-600 font-medium">
                  ₹{p.productPrice}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => decrease(p._id)}
                    disabled={isRemoving === p._id}
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{quantities[p._id] || 1}</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => increase(p._id)}
                    disabled={isRemoving === p._id}
                  >
                    +
                  </button>
                </div>

                {/* Line Total */}
                <div className="text-right font-semibold">
                  ₹{(Number(p.productPrice) * (quantities[p._id] || 1)).toFixed(2)}
                </div>

                {/* Delete Button */}
                <div className="text-center">
                  <button
                    className="text-red-500 bg-red-50 border border-red-400 p-2 rounded-md hover:text-red-700 hover:bg-red-200 disabled:opacity-50"
                    onClick={() => handleRemoveItem(p._id)}
                    disabled={isRemoving === p._id}
                  >
                    {isRemoving === p._id ? (
                      <FaSpinner className="animate-spin h-5 w-5" />
                    ) : (
                      <MdDelete size={20} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View - Card Layout */}
          <div className="md:hidden space-y-4">
            {cartProducts.map(p => (
              <div key={p._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      {p.productImages ? (
                        <img
                          src={p.productImages}
                          alt={p.productName}
                          className="object-cover h-full w-full"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://via.placeholder.com/100x100?text=No+Image")
                          }
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      {/* Product Name */}
                      <div className="font-medium text-gray-800 mb-1">{p.productName}</div>
                      
                      {/* Unit Price */}
                      <div className="text-teal-600 font-medium">
                        ₹{p.productPrice}
                      </div>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      className="text-red-500 bg-red-50 border border-red-400 p-2 rounded-md hover:text-red-700 hover:bg-red-200 disabled:opacity-50"
                      onClick={() => handleRemoveItem(p._id)}
                      disabled={isRemoving === p._id}
                    >
                      {isRemoving === p._id ? (
                        <FaSpinner className="animate-spin h-5 w-5" />
                      ) : (
                        <MdDelete size={20} />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Quantity:</span>
                    <div className="flex border border-gray-300 rounded">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => decrease(p._id)}
                        disabled={isRemoving === p._id}
                      >
                        −
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center bg-white">
                        {quantities[p._id] || 1}
                      </span>
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => increase(p._id)}
                        disabled={isRemoving === p._id}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Line Total */}
                  <div className="font-semibold">
                    Total: ₹{(Number(p.productPrice) * (quantities[p._id] || 1)).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal & Checkout - Works for both views */}
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <span className="text-xl font-bold">
                Subtotal: ₹{subtotal.toFixed(2)}
              </span>
              <button
                className="w-full sm:w-auto bg-teal-600 text-white px-8 py-3 rounded hover:bg-teal-700 transition disabled:opacity-70 flex items-center justify-center"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <FaSpinner className="animate-spin mr-2 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}