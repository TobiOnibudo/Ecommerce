import './NewCollections.css'
import new_collection from '../assets/new_collections';
import Item from '../Item/Item';
import { useEffect, useState } from 'react';
import { Product } from '../../Context/ShopContext';

function NewCollections(){

  const [new_collection,setNewCollection] = useState([]) 

  useEffect(()=>{
    fetchNewCollections()
  },[])

  const fetchNewCollections= async () =>{
    const response = await fetch("http://localhost:4000/newcollection")
    const responseData = await response.json()
    console.log(responseData)
    setNewCollection(responseData)
  }
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection?.map((item : Product ,i : React.Key)=> 
        {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
};

export default NewCollections;
