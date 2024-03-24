import {useState,ChangeEvent,useEffect} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

function AddProduct(){
    const [image,setImage] = useState<File | null>(null);

    const [productDetails,setProductDetails] = useState({
        name: "",
        image: "",
        category: "kids",
        new_price: "",
        old_price: "",
    })

    const imageHandler = (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        file ? setImage(file) : setImage(null)
    }

    const changeHandler = (e : ChangeEvent<HTMLInputElement| HTMLSelectElement> ) => {
        setProductDetails({...productDetails,[e.target.name]: e.target.value})
    }

    const addProduct  = async() =>
    {
        let product = productDetails;
        let formData = new FormData();
        if (image)
        {
            formData.append('product', image)
        }

        const resp =  await fetch('http://localhost:4000/upload',{
            method: 'POST',
            headers:
            {
                Accept:'application/json',
            },
            body: formData,
        })

        const responseData = await resp.json();

        if (responseData?.success)
        {
            product.image = responseData?.image_url;
            const storeProduct = await fetch('http://localhost:4000/addproduct',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    "Content-Type" : 'application/json',
                },
                body: JSON.stringify(product),
            })
            const prodData = await storeProduct.json()
            prodData?.success ? alert("Product Added") : alert("Failed")
        }
    }



  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input onChange={changeHandler} value={productDetails.name} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input onChange={changeHandler} value={productDetails.old_price} type='text' name="old_price" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input onChange={changeHandler} value={productDetails.new_price} type='text' name="new_price" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select onChange={changeHandler} value={productDetails.category} name="category" className='add-product-selector'>
                <option value="kids">Kids</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image ? URL.createObjectURL(image) : upload_area } className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>

        <button onClick={() => {addProduct()}} className='addproduct-btn'>ADD</button>
      </div>
    </div>
  )
};

export default AddProduct;
