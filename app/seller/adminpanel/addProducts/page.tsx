"use client"
import { useAuth } from '@/context/authContext'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'


const Page = () => {
    const [addNewProduct, setAddNewProduct] = useState(false);
    const {user,loading}=useAuth();
    const [productData, setProductData] = useState({
        sellerId: user?.phone || "",
        productName: "",
        productPrice: "",
        productType: "",
        productImage:null as File | null,
        productBrand: "",
        productWeight: "",
        productDimension: ""
    })
    const handleSubmit = async (e: any) => {
        e.preventDefault();
       console.log(productData)
       setAddNewProduct(false)
    }
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        })
    }
    if (user) {
        return (
            <div className='mt-24 h-full w-full'>
                <header className='flex'>
                    <search className='w-1/2 ml-4  flex'>
                        <input type="search" name="search" id="search" placeholder='Search Products' className='border px-2 rounded w-[60%]' />
                    </search>
                    <h1 className='w-1/2 flex justify-end mr-2 uppercase'>
                        <button onClick={() => setAddNewProduct(true)} className='flex bg-teal-800 text-white p-2 rounded'><FaPlus className='mt-1' />Add new Product </button>
                    </h1>
                </header>
                {addNewProduct && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-[slideIn_0.3s_ease-out]">
                            {/* Form Header */}
                            <div className="bg-gradient-to-r from-teal-700 to-teal-500 px-6 py-4 rounded-t-xl flex justify-between items-center sticky top-0 z-10">
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <FaPlus /> Add New Product
                                </h2>
                                <button 
                                    onClick={() => setAddNewProduct(false)} 
                                    className="text-white/80 hover:text-white transition-colors"
                                    aria-label="Close"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-6 space-y-8">
                                {/* Basic Information Section */}
                                <div className="border-b border-gray-100 pb-5">
                                    <h3 className="text-sm font-medium text-teal-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Basic Information
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Product Name */}
                                        <div>
                                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                                                Product Name <span className="text-red-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                id="productName" 
                                                name='productName' 
                                                onChange={handleChange} 
                                                value={productData.productName} 
                                                className="block w-full border border-gray-300 rounded-md px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-gray-400 transition-all"
                                                placeholder="Enter product name"
                                                required
                                            />
                                        </div>

                                        {/* Product Price */}
                                        <div>
                                            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                                Price <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500">₹</span>
                                                </div>
                                                <input 
                                                    type="number" 
                                                    name="productPrice" 
                                                    id="productPrice" 
                                                    onChange={handleChange} 
                                                    value={productData.productPrice}
                                                    className="block w-full pl-7 border border-gray-300 rounded-md px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-gray-400 transition-all"
                                                    placeholder="0.00"
                                                    min="0"
                                                    step="0.01"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Product Type */}
                                        <div>
                                            <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">
                                                Category <span className="text-red-500">*</span>
                                            </label>
                                            <select 
                                                name="productType" 
                                                id="productType"
                                                onChange={handleChange}
                                                value={productData.productType}
                                                className="block w-full border border-gray-300 rounded-md px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white appearance-none transition-all"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23374151'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 0.75rem center',
                                                    backgroundSize: '1rem',
                                                    paddingRight: '2.5rem'
                                                }}
                                                required
                                            >
                                                <option value="">-- Select Category --</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="DigitalProducts">Digital Products</option>
                                                <option value="Electrical">Electrical</option>
                                                <option value="Kitchen and Housewares">Kitchen and Housewares</option>
                                                <option value="Mobile,Laptops,etc">Mobile, Laptops, etc</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        {/* Product Brand */}
                                        <div>
                                            <label htmlFor="productBrand" className="block text-sm font-medium text-gray-700 mb-1">
                                                Brand
                                            </label>
                                            <input 
                                                type="text" 
                                                name="productBrand" 
                                                id="productBrand" 
                                                onChange={handleChange} 
                                                value={productData.productBrand}
                                                className="block w-full border border-gray-300 rounded-md px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-gray-400 transition-all"
                                                placeholder="Enter brand name"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information Section */}
                                <div className="border-b border-gray-100 pb-5">
                                    <h3 className="text-sm font-medium text-teal-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Additional Information
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Product Weight */}
                                        <div>
                                            <label htmlFor="productWeight" className="block text-sm font-medium text-gray-700 mb-1">
                                                Weight
                                            </label>
                                            <input 
                                                type="text" 
                                                name="productWeight" 
                                                id="productWeight" 
                                                onChange={handleChange} 
                                                value={productData.productWeight}
                                                placeholder="e.g., 500g, 2kg"
                                                className="block w-full border border-gray-300 rounded-md px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-gray-400 transition-all"
                                            />
                                        </div>

                                        {/* Product Dimensions */}
                                        <div>
                                            <label htmlFor="productDimension" className="block text-sm font-medium text-gray-700 mb-1">
                                                Dimensions
                                            </label>
                                            <input 
                                                type="text" 
                                                name="productDimension" 
                                                id="productDimension" 
                                                onChange={handleChange} 
                                                value={productData.productDimension}
                                                placeholder="e.g., 10x5x2 cm"
                                                className="block w-full border border-gray-300 rounded-md px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-gray-400 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Image Section */}
                                <div>
                                    <h3 className="text-sm font-medium text-teal-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
                                        </svg>
                                        Product Image
                                    </h3>
                                    
                                    <label htmlFor="productImage" className="flex flex-col justify-center items-center w-full h-36 bg-gray-50 border-2 border-dashed border-teal-200 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                            <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                        <input 
                                            type="file"
                                            name="productImage"
                                            id="productImage"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setProductData({
                                                        ...productData,
                                                        productImage: e.target.files[0]
                                                    })
                                                }
                                            }}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </label>
                                    
                                    {productData.productImage && (
                                        <div className="mt-3 flex items-center gap-2 text-teal-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm">
                                                {typeof productData.productImage === 'string' 
                                                    ? productData.productImage
                                                    : productData.productImage instanceof File 
                                                        ? productData.productImage.name
                                                        : 'File selected'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Hidden Seller ID */}
                                <input type="hidden" name="sellerId" value={user?.phone || ""} />

                                {/* Form Actions */}
                                <div className="flex justify-end gap-3 pt-5 mt-6 border-t border-gray-100">
                                    <button 
                                        type="button" 
                                        onClick={() => setAddNewProduct(false)}
                                        className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-5 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all flex items-center gap-2 font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    if (!user) return <p>Not Authorized</p>
    if (loading) return <p>Loading...</p>
}

// Make sure this export is at the bottom of the file, not inside any conditional blocks
export default Page
