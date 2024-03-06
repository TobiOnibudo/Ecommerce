import './Popular.css';
import data_product from '../assets/data';
import Item from '../Item/Item';



type itemEnum = {
  name: string;
  image: string;
  old_price : number;
  new_price: number;
}
function Popular(){
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-item">
        {data_product.map((item : itemEnum, i : number)=>{
          return <Item key={i} id={i} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> 
        })}
      </div>
    </div>
  )
};

export default Popular;
