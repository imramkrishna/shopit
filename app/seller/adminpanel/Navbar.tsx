"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import { FaUser, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { FiPlusCircle, FiEdit2, FiTrendingUp, FiMessageSquare, FiTrash2 } from 'react-icons/fi'

const Navbar = () => {
    const { user, logout, loading } = useAuth();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user) return <p className="p-4">Not Authorized</p>
    if (loading) return <p className="p-4">Loading...</p>

    const navLinks = [
        { href: "/seller/adminpanel/dashboard", id: "dashboard", icon: <FaHome className="text-xl md:text-2xl" />, label: "Dashboard" },
        { href: "/seller/adminpanel/addProducts", id: "add", icon: <FiPlusCircle className="text-xl md:text-2xl" />, label: "Add Products" },
        { href: "/seller/adminpanel/modifyProducts", id: "modify", icon: <FiEdit2 className="text-xl md:text-2xl" />, label: "Modify Products" },
        { href: "/seller/adminpanel/deleteProducts", id: "delete", icon: <FiTrash2 className="text-xl md:text-2xl" />, label: "Delete Products" },
        { href: "/seller/adminpanel/topSelling", id: "topselling", icon: <FiTrendingUp className="text-xl md:text-2xl" />, label: "Top Selling" },
        { href: "/seller/adminpanel/replyCustomers", id: "reply", icon: <FiMessageSquare className="text-xl md:text-2xl" />, label: "Reply Customers" },
    ];

    return (
        <>
            {/* Mobile navbar toggle button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="bg-gray-800 text-white p-2 rounded-md"
                >
                    {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            
            {/* Mobile header bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#2E3A59] flex justify-end items-center px-4 z-30">
                <Link href="/seller/adminpanel/profile" className='flex h-full items-center gap-2'>
                    <div className='w-8 h-8 rounded-full bg-white text-black flex justify-center items-center'>
                        <FaUser />
                    </div>
                    <span className='text-white text-sm'>{user.email}</span>
                </Link>
            </div>

            {/* Sidebar - responsive */}
            <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-40 bg-[#364152] w-[240px] md:w-[280px] lg:w-[300px]`}>
                <div className='w-full h-20 flex justify-center items-center'>
                    <Image src="/shopit.png" alt="Logo" width={150} height={150} className='rounded-full' />
                </div>
                <hr className="opacity-20" />
                
                <div className='w-full text-white flex flex-col gap-2 my-6'>
                    {navLinks.map(link => (
                        <Link 
                            key={link.id}
                            href={link.href} 
                            onClick={() => {
                                setActiveTab(link.id);
                                if (window.innerWidth < 768) setSidebarOpen(false);
                            }}
                            className={`flex items-center px-4 py-3 mx-2 rounded-md hover:bg-blue-600 transition-colors ${activeTab === link.id ? 'bg-blue-500' : ''}`}
                        >
                            <span className="mr-3">{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Desktop header */}
            <div className="hidden md:flex fixed top-0 left-[280px] lg:left-[300px] right-0 h-16 bg-[#2E3A59] justify-end items-center px-6 z-30">
                <Link href="/seller/adminpanel/profile" className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-white text-black flex justify-center items-center'>
                        <FaUser size={20} />
                    </div>
                    <span className='text-white'>{user.email}</span>
                </Link>
            </div>
            
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </>
    )
}

export default Navbar
