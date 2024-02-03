import "./Navbar.css"

import logo from "../Assets/logo.png"
import cart_icon from "../assets/cart_icon.png"

function  Navbar(){
    return (
      <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li>Shop</li>
            <li>Menu</li>
            <li>Women</li>
            <li>Kids</li>
        </ul>

        <div className="nav-login-cart">
            <button>Login</button>
            <img src="cart_icon" alt="an icon of a cart" />
        </div>
      </div>
    )
  };
  
  export default Navbar
  