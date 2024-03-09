import { createContext, useContext, useState } from "react";
import all_product from "../Components/assets/all_product";



export type Product = {
    id: number,
    name: string,
    category: string,
    image: string,
    new_price: number,
    old_price: number,
  }

  type AddToCartFunction = (itemId: number) => void;
  type RemoveFromCartFunction = (itemId: number) => void;

  type CartItem = {count : number}
  interface ContextValue {
    all_product: Product[];
    cartItems: CartItem[];
    addToCart : AddToCartFunction;
    removeFromCart : RemoveFromCartFunction;
  }
    
  const defaultValue: ContextValue = {
    all_product: [],
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {}
};
export const ShopContext = createContext<ContextValue>(defaultValue);

export const useShop = () => useContext(ShopContext);

const getDefaultCart = () =>{
    const cart : any = {};
    const productLength = all_product ? all_product.length : 0;
    for (let index = 0; index < productLength+1; index++) {
       cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props : any) => {
    const [cartItems,setCartItems] = useState(getDefaultCart());    
    const addToCart = (itemId : number) => {
        setCartItems((prev : any)=>({...prev,[itemId]:prev[itemId]+1}))
    } 

    const removeFromCart = (itemId : number) => {
        setCartItems((prev : any)=>({...prev,[itemId]:prev[itemId]-1}))
    } 

    const contextValue =  {all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;

