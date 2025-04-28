"use client"
import { useAuth } from '@/context/authContext'
import React from 'react'

const Page = () => {
    const { user, loading } = useAuth()
    if (user) {
        return (
            <div>
                Reply Customers

            </div>
        )
    }
    if(!user) return <p>Not Authorized</p>
    if(loading) return <p>Loading...</p>

}

export default Page
