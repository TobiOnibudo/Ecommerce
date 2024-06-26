import './ListProduct.css'
import {useState,useEffect} from 'react'
import cross_icon from '../../assets/cross_icon.png'

function ListProduct(){
    const [allproducts,setAllProducts] = useState([]);
  
    type Product = {
        id: number,
        name: string,
        category: string,
        image: string,
        new_price: number,
        old_price: number,
    }


    const fetchProdInfo = async () =>{
        const response = await fetch('http://localhost:4000/allproducts')
        const responseData = await response.json()
        console.log(responseData)
        setAllProducts(responseData)
    }


    const remove_product = async (id : number) =>{
        await fetch('http://localhost:4000/deleteproduct',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                "Content-type": "application/json"
            },
            body:JSON.stringify({id:id})
        });

        await fetchProdInfo();
    }

    useEffect(()=>{
        fetchProdInfo()},[])

    return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
            <hr />
            {allproducts.map((product : Product ,index : React.Key) =>{
                return (
                    <div key={index}>
                        <div className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt="" className="listproduct-product-icon" />  
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={()=>{remove_product(product.id)}} className="listproduct-remove-icon" src={cross_icon} alt="" />
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    </div>
  )
};

export default ListProduct;
