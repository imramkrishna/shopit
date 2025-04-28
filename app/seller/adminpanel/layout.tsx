"use client"
import { useAuth } from "@/context/authContext"
import Link from "next/link"
import React from "react"
import Navbar from "./Navbar"

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-xl mb-4 text-center">You need to be logged in to access this area</p>
        <Link href="/seller/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Login
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="md:ml-[280px] lg:ml-[300px] min-h-screen">
        {children}
      </div>
    </div>
  )
}
