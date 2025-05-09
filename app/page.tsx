"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { useCart } from "@/context/cartContext";

export default function Home() {
  const {addToCart,removeFromCart,cartItems}=useCart();
  const [products, setProducts] = useState<any[]|null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchApi() {
    setProducts(null);
    try {
      
      const response = await axios.get("https://sopitbackend.onrender.com/seller/productList");
      if (Array.isArray(response.data)) {
        setProducts(response.data);

        // Create random featured products AFTER we have the data
        const randomProducts = [];
        const max = Math.min(response.data.length, 250); // Safety check

        for (let i = 0; i < 50 && max > 0; i++) {
          const number = Math.floor(Math.random() * max);
          if (response.data[number]) {
            randomProducts.push(response.data[number]);
          }
        }

        setFeaturedProducts(randomProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <main className="pt-16">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold my-4">Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product,index) => (
              product && (
                <div key={index} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-300 flex flex-col">
                  {/* Product Image */}
                  <div className="h-48 overflow-hidden bg-gray-100">
                    {product.productImages ? (
                      <img 
                        src={product.productImages} 
                        alt={product.productName} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.productName}</h3>
                    <p className="text-teal-600 font-bold text-xl mb-2">₹{product.productPrice}</p>
                    {product.productBrand && (
                      <p className="text-gray-500 text-sm mb-2">{product.productBrand}</p>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="p-4 pt-0 space-y-2">
                    <button 
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition-colors flex items-center justify-center gap-2"
                      onClick={() => {/* Add view details logic */}}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      View Details
                    </button>
                    
                    <button 
                      className="w-full border border-teal-600 text-teal-600 hover:bg-teal-50 py-2 rounded transition-colors flex items-center justify-center gap-2"
                      onClick={() => {
                        try {
                          addToCart(product._id)
                          
                        } catch(e) {
                          console.log("Error while adding to cart", e)
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
