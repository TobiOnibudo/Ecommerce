import "./Navbar.css"

import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { useState } from "react"
import { Link } from "react-router-dom"

function  Navbar(){
  const [menu,setMenu] = useState("shop")
  
    return (
      <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}>
              <Link className="link"  to='/'>Shop</Link>
             {menu == "shop" ? <hr/> : <></>}
            </li>
            <li onClick={()=>{setMenu("men")}}>
            <Link className="link"  to='/Men'>Men</Link>
             {menu == "men" ? <hr/> : <></>}
            </li>
            <li onClick={()=>{setMenu("women")}}>
            <Link className="link" to='/women'>Women</Link>
            {menu == "women" ? <hr/> : <></>}
            </li>
            <li onClick={()=>{setMenu("kids")}}>
            <Link className="link" to='/kids'>Kids</Link>
            {menu == "kids" ? <hr/> : <></>}
            </li>
        </ul>

        <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'>
              <img src={cart_icon} alt="an icon of a cart" />
            </Link>
            <div className="nav-cart-count">0</div>
        </div>
      </div>
    )
  };
  
  export default Navbar
  