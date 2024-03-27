import './Popular.css';
import data_product from '../assets/data';
import Item from '../Item/Item';
import { useEffect,useState } from 'react';



type itemEnum = {
  id  : number;
  name: string;
  image: string;
  old_price : number;
  new_price: number;
}
function Popular(){
  const [popularProducts,setPopularProducts] = useState([])

  useEffect(()=>{
    fetchPopular()
  },[])

  const fetchPopular = async () =>{
    const response = await fetch("http://localhost:4000/popular/women")
    const responseData = await response.json()
    console.log(responseData)
    setPopularProducts(responseData)
  }
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-item">
        {popularProducts?.map((item : itemEnum, i : number)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> 
        })}
      </div>
    </div>
  )
};

export default Popular;
