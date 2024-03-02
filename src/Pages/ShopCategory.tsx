import { useShop } from "../Context/ShopContext";
import "./CSS/ShopCategory.css"



type Props = 
{
  banner : string,
  category : string,
}

function ShopCategory({banner,category, ...props} : Props){
  const {all_product} = useShop()
  
  return (
    <div className="shop-category">
      <img src={banner} alt="banner display discounts and a model on the page "/>
      <div></div>
    </div>
  )
};

export default ShopCategory;
