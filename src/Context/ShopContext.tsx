import { createContext, useContext } from "react";
import all_product from "../Components/assets/all_product";
import Product from "../Pages/Product";


export type Product = {
    id: number,
    name: string,
    category: string,
    image: string,
    new_price: number,
    old_price: number,
  }



export const ShopContext = createContext<Array<Product>
>([]);

export const useShop = () => useContext(ShopContext);

const ShopContextProvider = (props : any) => {
    const contextValue =  all_product

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;

