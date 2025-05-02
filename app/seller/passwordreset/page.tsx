"use client"
import React ,{useState}from 'react'

const page = () => {
  const [formData,setFormData]=useState({
    username:"",
    password:""
  })
  const handleSubmit=(e:any)=>{

  }
  const handleChange=(e:any)=>{

  }
  return (
    <div className='flex justify-center items-center w-full h-full min-h-screen'>
      <div className="card flex flex-row justify-center items-center w-1/5 h-1/5 bg-slate-300">
      <form className='grid grid-rows-3' onClick={handleSubmit}>
        <div className='flex flex-col'>
          <label htmlFor="username">Username : </label>
          <input type="number" id="username" name="username" value={formData.username}/>
        </div>
        <div>
          <label htmlFor=""></label>
        </div>
        <div>

        </div>
      </form>


      </div>
    </div>
  )
}

export default page
