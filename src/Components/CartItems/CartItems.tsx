import { useShop } from "../../Context/ShopContext";
import "./CartItems.css";
import remove_icon from "../assets/cart_cross_icon.png"
function CartItems(){
    const {all_product, cartItems, removeFromCart,getTotalCartAmount} = useShop();
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
                <div className="cartitems-format cartitems-format-main">
                    <img src={product.image} alt=""  className="carticon-product"/>
                    <p>{product.name}</p>
                    <p>${product.new_price}</p>
                    <button className="cartitems-quantity">{cartItems[product.id]}</button>
                    <p>${product.new_price * cartItems[product.id]} </p>
                    <img className="cartitems-remove-icon" src={remove_icon} onClick={() => {removeFromCart(product.id)}}
                    alt="icon that is meant to remove an item from the cart" />
                </div>
                <hr/>
            </div>
            )
            }
            return null
        })}

        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${0}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <p> Shipping Fee </p>
                        <p> Free </p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button> PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder="promo code"/>
                    <button>Submit</button>
                </div>
            </div>
        </div>
      </div>
    )
  };
  
  export default CartItems;
  