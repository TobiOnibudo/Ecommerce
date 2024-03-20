import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

function Navbar(){
  return (
    <div className='navbar'>
        <img src={navlogo} alt="navbar logo" className='nav-logo'/>
        <img src={navProfile} className="nav-profile" alt="navbar profile" />
    </div>
  )
};

export default Navbar;
