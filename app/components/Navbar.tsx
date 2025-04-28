"use client"
import { useState, useEffect, useRef } from "react"
import { FaSearch, FaShoppingCart } from "react-icons/fa"
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { CiDeliveryTruck, CiShop } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image"

const Navbar = () => {

  const [isHamBurgerOpen, setIsHamBurgerOpen] = useState(true)
  const [searchData, setSearchData] = useState({
    Search: ""
  })
  const handleSearch = async (e: any) => {
    e.preventDefault()
    console.log(searchData)
  }
  const handleChange = async (e: any) => {
    const { name, value } = e.target
    setSearchData({
      ...searchData,
      [name]: value
    })


  }


  return (

    <>
      {
        !isHamBurgerOpen && (
          <div className="fixed top-14 left-0 w-full bg-[#2c3e50] text-white z-50 md:hidden
                    transform transition-all duration-300 ease-in-out 
                    shadow-lg border-t border-gray-700">
            <div className="flex flex-col divide-y divide-gray-700">
              <Link href="/seller/registration" className="p-4 flex items-center gap-3 hover:bg-[#34495e] active:bg-[#1a252f] transition-colors">
                <span className="text-2xl"><CiShop /></span>
                <span className="font-medium">Become a Seller</span>
              </Link>
              <Link href="/orders" className="p-4 flex items-center gap-3 hover:bg-[#34495e] active:bg-[#1a252f] transition-colors">
                <span className="text-2xl"><CiDeliveryTruck /></span>
                <span className="font-medium">My Orders</span>
              </Link>
              <Link href="/cart" className="p-4 flex items-center gap-3 hover:bg-[#34495e] active:bg-[#1a252f] transition-colors">
                <span className="text-2xl"><FaShoppingCart /></span>
                <span className="font-medium">Cart</span>
              </Link>
              <Link href="/profile" className="p-4 flex items-center gap-3 hover:bg-[#34495e] active:bg-[#1a252f] transition-colors">
                <span className="text-2xl"><CgProfile /></span>
                <span className="font-medium">Profile</span>
              </Link>
            </div>
          </div>
        )
      }
      <nav className="flex min-h-screen w-full">
        <header className="h-14 fixed  bg-[#2c3e50]  w-full flex justify-between items-center">
          <div className="logo flex w-[25%] md:w-[20%] items-center">
            <Image
              src="/logoshop.png"
              alt="ShopIt"
              width={150}
              height={100}
              className="object-contain pointer"
            />
          </div>
          <div className="Search flex md:w-[50%] w-[75%] items-center">
            <form className="w-full flex h-10" onSubmit={handleSearch}>
              <label htmlFor="Search"></label>
              <input type="text" name="Search" placeholder="Search Items" className="outline-none text-white border-slate-400 rounded-l-md border px-2 w-[70%]" onChange={handleChange} value={searchData.Search} />
              <button type="submit" className="border border-slate-400 h-full flex justify-center px-4 items-center bg-[#febd68] md:px-6 md:w-[5%] w-[10%] rounded-r-md"><p><FaSearch /></p></button>
            </form>
          </div>
          <div className="hidden text-slate-100 md:w-[20%] md:gap-10 whitespace-nowrap md:flex"><Link href="/seller/registration"><p className="text-md hidden  lg:flex gap-1"><span className="text-2xl"><CiShop /></span><span>Become a Seller</span></p></Link>
            <p className="text-md flex gap-1 pointer"><span className="text-2xl"><CiDeliveryTruck /></span><span>My Orders</span></p>
          </div>
          <div className="hamburger text-slate-400 md:hidden text-2xl mx-2" onClick={() => setIsHamBurgerOpen(!isHamBurgerOpen)}>{isHamBurgerOpen ? <GiHamburgerMenu /> : <RxCross1 />}</div>
          <div className="accounts text-[#ddd2d2] hidden md:w-[30%] md:flex md:justify-evenly">

            <p className=" flex gap-2 pointer"><span className="text-2xl"><FaShoppingCart /></span><span className="text-md">Cart</span></p>
            <p className="flex gap-2 pointer"><span className="text-2xl"><CgProfile /></span><span className="text-md">Profile</span></p>
          </div>


        </header>
        <section className="bg-[#34495e] overflow-y-auto fixed mt-14 w-full h-8 flex text-white">
          <ul className="mx-6 w-full flex gap-10 items-center whitespace-nowrap">
            <li>All</li>
            <li>Cosmetics</li>
            <li>Electronics</li>
            <li>Kitchen</li>
            <li>Today Deals</li>
            <li>BestSellers</li>
            <li>Fashion</li>
            <li><Link href="/seller/registration">Become a Seller</Link></li>
            <li>Become a Customer</li>
            <li>Customer Login</li>
            <li><Link href="/seller/login">Seller Login</Link></li>

          </ul>
        </section>
      </nav>


    </>

  )
}

export default Navbar
