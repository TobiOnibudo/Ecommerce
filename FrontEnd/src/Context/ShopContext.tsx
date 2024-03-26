import { createContext, useContext, useEffect, useState } from "react";



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
  type GetTotalCartAmountFunction = () => number;
  type GetTotalCartItemsFunction = () => number;

  type CartItem = {[key: string]: number};
  interface ContextValue {
    all_product: Product[] | undefined;
    cartItems: CartItem;
    addToCart : AddToCartFunction;
    removeFromCart : RemoveFromCartFunction;
    getTotalCartAmount : GetTotalCartAmountFunction;
    getTotalCartItems : GetTotalCartItemsFunction;
  }
    
  const defaultValue: ContextValue = {
    all_product: [],
    cartItems: {},
    addToCart: () => {},
    removeFromCart: () => {},
    getTotalCartAmount: () => {return 0},
    getTotalCartItems : () => {return 0},
};
export const ShopContext = createContext<ContextValue>(defaultValue);

export const useShop = () => useContext(ShopContext);

const getDefaultCart = () =>{
    const cart : any = {};
    const productLength = 30;
    for (let index = 0; index < productLength+1; index++) {
       cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props : any) => {
   
    const [all_product,setAllProducts] = useState<Product[]>();
    const [cartItems,setCartItems] = useState(getDefaultCart());    
    
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data : Product[])=> {console.log(data) ;setAllProducts(data)})
    },[])

    const addToCart = (itemId : number) => {
        setCartItems((prev : any)=>({...prev,[itemId]:prev[itemId]+1}))
    } 

    const removeFromCart = (itemId : number) => {
        setCartItems((prev : any)=>({...prev,[itemId]:prev[itemId]-1}))
    } 

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0)
            {
                let itemInfo = all_product?.find((product) => product.id === Number(item))
                let itemPrice = itemInfo?.new_price ?? 0
                totalAmount +=   itemPrice * cartItems[item]
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0
        for(const item in cartItems)
        {
            totalItem += cartItems[item] 
        }

        return totalItem
    }

    const contextValue =  {all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;

