import { useShop , Product} from "../Context/ShopContext";
import "./CSS/ShopCategory.css"
import dropdown_icon from "../Components/assets/dropdown_icon.png"
import Item from "../Components/Item/Item";

type Props = 
{
  banner : string,
  category : string,
}


function ShopCategory({banner,category, ...props} : Props){
  const {all_product} = useShop();
  
  return (
    <div className="shop-category">
      <img className="shop-category-banner" src={banner} alt="banner display discounts and a model on the page "/>
      <div className="shop-category-indexSort">
        <p>
          <span> Showing 1-12 </span> out of 36 products
        </p>
        <div className="shop-category-sort">
          Sort by <img src={dropdown_icon} alt="icon for a drop down" />        
        </div>
      </div>
      <div className="shop-category-products">
        {all_product.map((item : Product ,index: number)=> 
        {
            if(category === item.category)
            {
                return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else
            {
              return null;
            }
        })}
      </div>
      <div className="shop-category-loadmore">
        Explore more
      </div>
    </div>

  )
};

export default ShopCategory;
