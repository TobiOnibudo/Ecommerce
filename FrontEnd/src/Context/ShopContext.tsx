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
        if (localStorage.getItem('auth-token')){
            setCartItem(itemId)
        }
    } 

    const setCartItem = async (itemId : number) => {
        const response = await fetch("http://localhost:4000/addtocart",{
                method: 'POST',
                headers : {
                    Accept : 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            const responseData = await response.json()
            if (all_product){
            const shortName = all_product[responseData].name.split(' ').slice(0, 3).join(' ')
            alert(`Added ${shortName}... to cart`)
            }
            else {
                alert(`Something seems to have gone wrong while attempt to add in cart`)
            }
    }
    const removeFromCart = (itemId : number) => {
        setCartItems((prev : any)=>({...prev,[itemId]:prev[itemId]-1}))
        if (localStorage.getItem('auth-token')){
            removeCartItem(itemId)
        }
    } 

    const removeCartItem = async (itemId : number) => {
        const response = await fetch("http://localhost:4000/removefromcart",{
                method: 'POST',
                headers : {
                    Accept : 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            const responseData = await response.json()
            if (all_product){
            const shortName = all_product[responseData].name.split(' ').slice(0, 3).join(' ')
            alert(`Removed ${shortName}... from cart`)
            }
            else {
                alert(`Something seems to have gone wrong while attempt to add in cart`)
            }
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

