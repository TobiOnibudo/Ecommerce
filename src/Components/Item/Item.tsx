import "./Item.css"

type Props = {
    image : string;
    name: string;
    new_price : number;
    old_price : number;
}


function Item({image,name,new_price,old_price} : Props){
  return (
    <div className="item">
      <img src={image} alt="item image"/>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">
        {new_price}
        </div>
        <div className="item-price-old">
        {old_price}
        </div>
      </div>
    </div>
  )
};

export default Item;
