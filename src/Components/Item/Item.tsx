import { Link } from "react-router-dom";
import "./Item.css"

type Props = {
    id : number;
    image : string;
    name: string;
    new_price : number;
    old_price : number;
}


function Item({id,image,name,new_price,old_price} : Props){
  return (
    <div className="item">
      <Link to={`/product/${id}`}><img src={image} alt="item image"/></Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">
        ${new_price}
        </div>
        <div className="item-price-old">
        ${old_price}
        </div>
      </div>
    </div>
  )
};

export default Item;
