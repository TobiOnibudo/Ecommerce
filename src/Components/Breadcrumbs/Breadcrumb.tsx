import './Breadcrumb.css'
import { Product } from '../../Context/ShopContext';
import arrow_icon from "../assets/breadcrum_arrow.png"
interface BreadcrumbProps {
  product?: Product; 
}

function Breadcrumb ({ product }: BreadcrumbProps) {
  
  return (
    <div className="breadcrumb">
      HOME <img src={arrow_icon} alt='arrow-icon'/>
      SHOP <img src={arrow_icon} alt="arrow-icon" />
      {product?.category} <img src={arrow_icon} alt="arrow-icon" />
      {product?.name}
    </div>
    
  )
};

export default Breadcrumb;
