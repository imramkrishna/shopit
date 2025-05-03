"use client"
import { createContext,useContext,useState,useEffect,ReactNode} from "react"
interface CartContextType{
    cartItems:ItemType[];
    addToCart:(product:ItemType)=>void;
    removeFromCart:(product:ItemType)=>void;
}
interface Props{
    children:ReactNode;
}
interface ItemType{
    productId:String;
}
export const CartContext=createContext<CartContextType | undefined>(undefined)
export const CartProvider=({children}:Props)=>{
    const[cartItems,setCartItems]=useState<ItemType[]>([])
    const addToCart=(product:ItemType)=>{
        setCartItems(prevItems=>[...prevItems,product])
    }
    const removeFromCart=(product:ItemType)=>{
        setCartItems(prevItems=>
            prevItems.filter(item=>item.productId!==product.productId)
        )
    }
    return(
        <CartContext.Provider value={{addToCart,removeFromCart,cartItems}}>
          {children}
        </CartContext.Provider>
    )
}
export const useCart=()=>{
    const cart=useContext(CartContext);
    if(cart==undefined){
        throw new Error("Cart Items is undefined.")
    }
    return cart;
}
