import "./Navbar.css"

import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useShop } from "../../Context/ShopContext"
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import nav_dropdown from '../assets/nav-dropdown.jpg'


function  Navbar(){
  const [menu,setMenu] = useState("shop")
  const {getTotalCartItems} = useShop();
  const menuRef =  useRef<HTMLUListElement>(null);
  
  const dropdown_toggle = (event : React.MouseEvent<HTMLImageElement>) =>  {
    menuRef.current ? menuRef.current.classList?.toggle('nav-menu-visible') : null;
    event.target instanceof HTMLImageElement ? event.target.classList.toggle('open') : null;
  }

  return (
      <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
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
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
    )
  };
  
  export default Navbar
  