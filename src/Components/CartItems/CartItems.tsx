import { useShop } from "../../Context/ShopContext";
import "./CartItems.css";
import remove_icon from "../assets/cart_cross_icon.png"
function CartItems(){
    const {all_product, cartItems, removeFromCart} = useShop();
    return (
      <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        {all_product.map((product) =>
        {
            if (cartItems[product.id] > 0)
            {
                return  (
                <div>
                <div className="cartitems-format">
                    <img src={product.image} alt=""  className="carticon-product"/>
                    <p>{product.name}</p>
                    <p>{product.new_price}</p>
                    <button className="cartitems-quantity">{cartItems[product.id]}</button>
                    <p>{product.new_price * cartItems[product.id]} </p>
                    <img src={remove_icon} onClick={() => {removeFromCart(product.id)}}
                    alt="icon that is meant to remove an item from the cart" />
    
                </div>
            </div>
            )
            }
        })}
      </div>
    )
  };
  
  export default CartItems;
  