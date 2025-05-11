"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { useCart } from "@/context/cartContext";

export default function CartPage() {
  const {removeFromCart}=useCart();
  const [cartProducts, setCartProducts] = useState<any[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  useEffect(() => {
    const stored = localStorage.getItem("cartItems") ?? "[]"
    const ids: string[] = JSON.parse(stored)
    // ALWAYS re-sync, even if empty
    fetchApi(ids)
  }, [])

  const fetchApi = async (ids: string[]) => {
    // if no IDs, clear everything
    if (ids.length === 0) {
      setCartProducts([])
      setQuantities({})
      return
    }

    try {
      const { data } = await axios.get(
        "https://sopitbackend.onrender.com/seller/productList"
      )
      if (!Array.isArray(data)) return

      const filtered = data.filter((p: any) => ids.includes(p._id))
      setCartProducts(filtered)

      // initialize all quantities to 1
      const initialQty: Record<string, number> = {}
      filtered.forEach(p => {
        initialQty[p._id] = 1
      })
      setQuantities(initialQty)
    } catch (e) {
      console.error("Failed to load cart products:", e)
    }
  }

  const increase = (id: string) =>
    setQuantities(q => ({ ...q, [id]: q[id] + 1 }))
  const decrease = (id: string) =>
    setQuantities(q => ({ ...q, [id]: Math.max(1, q[id] - 1) }))

  const subtotal = cartProducts.reduce((sum, p) => {
    const qty = quantities[p._id] || 1
    return sum + Number(p.productPrice) * qty
  }, 0)

  const handleCheckout = () => {
    localStorage.removeItem("cartItems")
    setCartProducts([])
    alert("Thank you for your purchase!")
  }

  return (
    <div className="pt-24 px-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartProducts.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          <p className="mb-4">Your cart is empty.</p>
          <a
            href="/"
            className="inline-block bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => decrease(p._id)}
                >
                  −
                </button>
                <span className="w-6 text-center">{quantities[p._id] || 1}</span>
                <button
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => increase(p._id)}
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
                  className="text-red-500 bg-red-50 border border-red-400 p-1 text-2xl hover:text-red-700 hover:bg-red-200"
                  onClick={() => {
                    removeFromCart(p._id)
                    window.location.reload();

                  }}
                >
                  <MdDelete/>
                </button>
              </div>
            </div>
          ))}

          {/* Subtotal & Checkout */}
          <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-gray-50 space-y-3 md:space-y-0">
            <span className="text-xl font-bold">
              Subtotal: ₹{subtotal.toFixed(2)}
            </span>
            <button
              className="bg-teal-600 text-white px-8 py-2 rounded hover:bg-teal-700 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}