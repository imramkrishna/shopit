"use client"
import { createContext,useContext,ReactNode,useState,useEffect } from "react";
import { useRouter } from "next/navigation";

interface User{
  email:string,
  phone:string
}
interface AuthContextType{
  user:User | null;
  login:(userData:User)=>void;
  logout:()=>void;
  loading:boolean
}
interface Props{
  children:ReactNode
}
export const AuthContext=createContext<AuthContextType | undefined>(undefined);
export const AuthProvider=({children}:Props)=>{
  const router=useRouter()
  const [user,setUser]=useState<User | null>(null);
  const [loading,setLoading]=useState(true);
  const login=(userData:User)=>{
    localStorage.setItem("user",JSON.stringify(userData))
    setUser(userData)
    router.push("/seller/adminpanel/dashboard")
    setLoading(false)
  }
  const logout=()=>{
    localStorage.removeItem("user");
    setUser(null);
    router.push("/seller/login")
    setLoading(false)
  }
  useEffect(() => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (e) {
        // Handle invalid JSON
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);
 return(
  <AuthContext.Provider value={{user,login,logout,loading}}>
    {children}
  </AuthContext.Provider>
 )
}
export const useAuth=()=>{
  const user=useContext(AuthContext);
  if(user==undefined){
    throw new Error("Error in NewAuth");
  }
  return user;
}