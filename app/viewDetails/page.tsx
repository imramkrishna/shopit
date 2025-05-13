"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cartContext"

interface Product {
  _id: string
  productName: string
  productPrice: number
  productBrand?: string
  productImages?: string
  productDescription?: string
  [key: string]: any
}

export default function ProductDetailsPage() {
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("product")
    if (stored) {
      try {
        setProduct(JSON.parse(stored))
      } catch {
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [])

  const handleAddToCart = () => {
    if (product) {
      try {
        addToCart(product._id)
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
      } catch (e) {
        console.error("Error adding to cart:", e)
      }
    }
  }

  const handleBuyNow = () => {
    if (product) {
      try {
        addToCart(product._id)
        router.push("/cart")
      } catch (e) {
        console.error("Error proceeding to checkout:", e)
      }
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mock data for a more complete UI
  const inStock = true
  const rating = 4.5
  const reviewCount = 117

  return (
    <main className="pt-24 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="list-none p-0 inline-flex text-gray-500">
            <li className="flex items-center">
              <a href="/" className="hover:text-teal-600">Home</a>
              <svg className="h-4 w-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="truncate max-w-xs">{product.productName}</li>
          </ol>
        </nav>

        {/* Product Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/5 relative">
              {/* Product Image */}
              <div className="h-80 sm:h-96 lg:h-full bg-gray-100 flex items-center justify-center">
                {product.productImages ? (
                  <img
                    src={product.productImages}
                    alt={product.productName}
                    className="object-contain w-full h-full p-4"
                    onError={e => {
                      e.currentTarget.src = "https://via.placeholder.com/600x600?text=Product+Image"
                    }}
                  />
                ) : (
                  <div className="text-gray-400 p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2">No Image Available</p>
                  </div>
                )}
              </div>

              {/* Badge for bestseller/new/sale */}
              <div className="absolute top-4 left-4">
                <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded">BESTSELLER</span>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="lg:w-3/5 p-6 sm:p-8 lg:border-l border-gray-200">
              {/* Product Title & Ratings */}
              <div className="mb-6">
                {product.productBrand && (
                  <div className="text-sm text-gray-500 mb-1">{product.productBrand}</div>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {product.productName}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <p className="ml-2 text-sm text-gray-600">{rating} ({reviewCount} reviews)</p>
                  </div>
                </div>

                {/* Price & Stock */}
                <div className="flex flex-wrap items-end gap-4 mb-5">
                  <div className="text-3xl font-bold text-gray-800">
                    ₹{product.productPrice.toFixed(2)}
                  </div>
                  <div className="text-gray-500 text-sm line-through">
                    ₹{(product.productPrice * 1.2).toFixed(2)}
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Save 20%
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center mb-6">
                  <div className={`w-3 h-3 rounded-full mr-2 ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-gray-600">
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex border border-gray-300 rounded-md w-32">
                  <button 
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center focus:outline-none"
                  />
                  <button 
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart and Buy Now Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`px-6 py-3 rounded-md font-medium text-sm flex-1 flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-teal-600 text-teal-600 hover:bg-teal-50'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="px-6 py-3 bg-teal-600 text-white rounded-md font-medium text-sm flex-1 hover:bg-teal-700 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Buy Now
                </button>
              </div>

              {/* Tabs for Description, Specs, etc. */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === 'description' 
                        ? 'text-teal-600 border-b-2 border-teal-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === 'specs' 
                        ? 'text-teal-600 border-b-2 border-teal-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('specs')}
                  >
                    Specifications
                  </button>
                </div>

                <div className="py-4">
                  {activeTab === 'description' && (
                    <div className="prose max-w-none text-gray-700">
                      {product.productDescription ? (
                        <p>{product.productDescription}</p>
                      ) : (
                        <p className="text-gray-500 italic">No description available for this product.</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      {Object.entries(product)
                        .filter(
                          ([key]) =>
                            ![
                              "_id",
                              "productName",
                              "productPrice",
                              "productBrand",
                              "productImages",
                              "productDescription",
                            ].includes(key)
                        )
                        .map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <dt className="text-gray-500 capitalize text-sm">
                              {key.replace(/([A-Z])/g, " $1").replace(/^product/i, "")}
                            </dt>
                            <dd className="font-medium text-gray-800">{String(value)}</dd>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </button>
        </div>
      </div>
    </main>
  )
}
