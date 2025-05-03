"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiShoppingBag, FiDollarSign, FiCheck, FiUpload } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import axios from "axios"

const SellerRegistration = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  
  const [formData, setFormData] = useState({
    // Personal Information
    sellerName: "",
    email: "",
    phone: "",
    dob: "",
    citizenshipNumber: "",
    fathersName: "",
    mothersName: "",
    religion: "",
    language: "",
    
    // Business Information
    shopName: "",
    businessType: "",
    occupation: "",
    panNumber: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    
    // Financial Information
    bankAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    bankName: "",
    monthlyIncome: "",
    annualIncome: "",
    
    // Documents
    signature: null,
    idProof: null,
    addressProof: null,
    
    // Terms
    declaration: false,
    termsAccepted: false
  });

  const steps = [
    { number: 1, title: "Personal Information", icon: <FiUser className="text-lg" /> },
    { number: 2, title: "Business Details", icon: <FiShoppingBag className="text-lg" /> },
    { number: 3, title: "Financial Details", icon: <FiDollarSign className="text-lg" /> },
    { number: 4, title: "Complete", icon: <FiCheck className="text-lg" /> }
  ];
  
  const handleChange = (e:any) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value
    });
  };
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would be where you'd send the form data to your backend
      
      console.log(formData)
      await axios.post("https://sopitbackend.onrender.com/seller/register",formData);
      console.log("Form submitted successfully");
      
      
      setFormSubmitted(true);
      setCurrentStep(4);
      
      // Redirect after successful submission (after showing success message)
      setTimeout(() => {
        // router.push("/seller/dashboard");
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormError("There was a problem submitting your application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form validation functions
  const isStepOneValid = () => {
    return formData.sellerName && formData.email && formData.phone && 
           formData.dob && formData.citizenshipNumber;
  };
  
  const isStepTwoValid = () => {
    return formData.shopName && formData.businessType && 
           formData.occupation && formData.panNumber && formData.address;
  };
  
  const isStepThreeValid = () => {
    return formData.monthlyIncome && 
           formData.declaration && formData.termsAccepted;
  };

  // Render the form content based on current step
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="sellerName" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                type="text" 
                id="sellerName"
                name="sellerName" 
                placeholder="Enter your legal name"
                onChange={handleChange} 
                value={formData.sellerName}
                required
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="you@example.com" 
                  onChange={handleChange} 
                  value={formData.email}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="tel" 
                  id="phone"
                  name="phone"
                  placeholder="+91 98765 43210"
                  onChange={handleChange} 
                  value={formData.phone}
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="date" 
                  id="dob"
                  name="dob" 
                  onChange={handleChange} 
                  value={formData.dob}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
                <p className="text-xs text-gray-500">You must be at least 18 years old</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="citizenshipNumber" className="block text-sm font-medium text-gray-700">Citizenship/ID Number <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="citizenshipNumber"
                  name="citizenshipNumber"
                  placeholder="Enter your ID number"
                  onChange={handleChange} 
                  value={formData.citizenshipNumber}
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fathersName" className="block text-sm font-medium text-gray-700">Father's Name</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="fathersName"
                  name="fathersName"
                  placeholder="Father's full name"
                  onChange={handleChange} 
                  value={formData.fathersName}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="mothersName" className="block text-sm font-medium text-gray-700">Mother's Name</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="mothersName"
                  name="mothersName"
                  placeholder="Mother's full name"
                  onChange={handleChange} 
                  value={formData.mothersName}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="religion" className="block text-sm font-medium text-gray-700">Religion</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="religion"
                  name="religion"
                  placeholder="Optional"
                  onChange={handleChange} 
                  value={formData.religion}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">Preferred Language</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  id="language"
                  name="language" 
                  onChange={handleChange} 
                  value={formData.language}
                >
                  <option value="">Select a language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Nepali">Nepali</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">Shop/Business Name <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="shopName"
                  name="shopName"
                  placeholder="Your store name"
                  onChange={handleChange} 
                  value={formData.shopName}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">Business Type <span className="text-red-500">*</span></label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  id="businessType"
                  name="businessType" 
                  onChange={handleChange} 
                  value={formData.businessType}
                  required
                >
                  <option value="">Select business type</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Private Limited">Private Limited</option>
                  <option value="Limited Liability Partnership">LLP</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Primary Occupation <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="occupation"
                  name="occupation"
                  placeholder="Your main profession"
                  onChange={handleChange} 
                  value={formData.occupation}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700">PAN Number <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="panNumber"
                  name="panNumber"
                  placeholder="ABCDE1234F"
                  onChange={handleChange} 
                  value={formData.panNumber}
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  title="Valid PAN format: ABCDE1234F"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700">GST Number (if applicable)</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                type="text" 
                id="gstNumber"
                name="gstNumber"
                placeholder="22AAAAA0000A1Z5"
                onChange={handleChange} 
                value={formData.gstNumber}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Business Address <span className="text-red-500">*</span></label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                rows={3}
                id="address"
                name="address"
                placeholder="Street address"
                onChange={handleChange} 
                value={formData.address}
                required
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="city"
                  name="city"
                  placeholder="Your city" 
                  onChange={handleChange} 
                  value={formData.city}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="state"
                  name="state"
                  placeholder="Your state"
                  onChange={handleChange} 
                  value={formData.state}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">PIN Code <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="pincode"
                  name="pincode"
                  placeholder="6-digit code"
                  maxLength={6}
                  onChange={handleChange} 
                  value={formData.pincode}
                  required
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-blue-700">
                All financial information is encrypted and securely stored according to industry standards.
              </p>
            </div>
            
            <h3 className="font-medium text-gray-700 border-b pb-2">Income Details</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">Monthly Income (₹) <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="number" 
                  id="monthlyIncome"
                  name="monthlyIncome" 
                  placeholder="E.g. 50000"
                  onChange={handleChange} 
                  value={formData.monthlyIncome}
                  min="0"
                  step="1000"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">Annual Income (₹) <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="number" 
                  id="annualIncome"
                  name="annualIncome" 
                  placeholder="E.g. 600000"
                  onChange={handleChange} 
                  value={formData.annualIncome}
                  min="0"
                  step="10000"
                  required
                />
              </div>
            </div>
            
            <h3 className="font-medium text-gray-700 border-b pb-2">Bank Account Details</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">Account Holder Name <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="accountHolderName"
                  name="accountHolderName" 
                  placeholder="Name as per bank records"
                  onChange={handleChange} 
                  value={formData.accountHolderName}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="bankName"
                  name="bankName" 
                  placeholder="e.g. State Bank of India"
                  onChange={handleChange} 
                  value={formData.bankName}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700">Account Number <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="bankAccountNumber"
                  name="bankAccountNumber" 
                  placeholder="Your bank account number"
                  onChange={handleChange} 
                  value={formData.bankAccountNumber}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code <span className="text-red-500">*</span></label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="ifscCode"
                  name="ifscCode" 
                  placeholder="e.g. SBIN0000123"
                  onChange={handleChange} 
                  value={formData.ifscCode}
                  required
                />
              </div>
            </div>
            
            <h3 className="font-medium text-gray-700 border-b pb-2">Document Upload</h3>
            <div className="mb-6">
              <div className="space-y-4 mt-4">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 relative">
                  <input 
                    type="file" 
                    id="signature"
                    name="signature" 
                    onChange={handleChange}
                    accept="image/*"
                    
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600 hover:text-blue-500">
                          Upload your signature
                        </span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>
                  {formData.signature && (
                    <div className="mt-4 flex items-center justify-center">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {formData.signature}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 relative">
                  <input 
                    type="file" 
                    id="idProof"
                    name="idProof" 
                    onChange={handleChange}
                    accept="image/*,.pdf"
                    
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600 hover:text-blue-500">
                          Upload ID proof
                        </span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Aadhar Card, Passport, Voter ID, Driving License
                      </p>
                    </div>
                  </div>
                  {formData.idProof && (
                    <div className="mt-4 flex items-center justify-center">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {formData.idProof}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <h3 className="font-medium text-gray-700 border-b pb-2">Terms & Declarations</h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="declaration"
                    name="declaration"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.declaration}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="declaration" className="font-medium text-gray-700">Declaration <span className="text-red-500">*</span></label>
                  <p className="text-gray-500">I hereby declare that all the information provided is correct and complete to the best of my knowledge. I understand that providing false information may result in the rejection of my application.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.termsAccepted}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAccepted" className="font-medium text-gray-700">Terms and Conditions <span className="text-red-500">*</span></label>
                  <p className="text-gray-500">I have read and agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <FiCheck className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering as a seller. Your application has been received and is under review.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-left mb-6">
              <p className="text-sm text-blue-700">
                You will receive an email confirmation shortly. Our team will review your application and contact you within 2-3 business days.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => router.push("/")}
            >
              Return to Home
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="mb-10 hidden md:block">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={`flex flex-col items-center ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep > step.number ? 'bg-blue-600 text-white' : 
                  currentStep === step.number ? 'border-2 border-blue-600 text-blue-600' : 
                  'border-2 border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? <FiCheck className="w-6 h-6" /> : step.icon}
                </div>
                <p className="mt-2 text-sm font-medium">{step.title}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-3">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gray-200" />
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Mobile step indicator */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-bold text-gray-900">
            Step {currentStep} of {steps.length-1}: {steps[currentStep-1].title}
          </h2>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
            {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%
          </span>
        </div>
        
        {/* Form container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Seller Registration</h1>
            <p className="text-blue-100 mt-1">Please complete all required information to register as a seller</p>
          </div>
          
          {formError && (
            <div className="bg-red-50 text-red-700 p-4 border-l-4 border-red-600 mt-4">
              <p>{formError}</p>
            </div>
          )}
          
          <form className="px-8 py-6" onSubmit={handleSubmit}>
            {/* Form content based on step */}
            {renderFormStep()}
            
            {/* Form navigation buttons */}
            {currentStep < 4 && (
              <div className="mt-8 flex justify-between items-center border-t pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Previous
                  </button>
                )}
                {currentStep === 1 && (
                  <div />
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === 1 ? !isStepOneValid() : !isStepTwoValid()}
                    className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                              ${(currentStep === 1 && isStepOneValid()) || 
                                (currentStep === 2 && isStepTwoValid()) 
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-400 cursor-not-allowed'} 
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepThreeValid() || isSubmitting}
                    className={`flex items-center justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                              ${isStepThreeValid() && !isSubmitting 
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-400 cursor-not-allowed'} 
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Submitting...
                      </>
                    ) : "Submit Application"}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-gray-500">
          <div className="flex flex-col items-center">
            <svg className="h-6 w-6 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure Form</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="h-6 w-6 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Data Protection</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="h-6 w-6 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Quick Process</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="h-6 w-6 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;