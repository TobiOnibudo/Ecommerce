import {useState,ChangeEvent,useEffect} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import all_products from '../../assets/all_product'
function AddProduct(){
    type Product = {
        name: string,
        category: string,
        image: string,
        new_price: number,
        old_price: number,
    }


    const [image,setImage] = useState<File | null>(new File([],""));
    const [currentProduct,setProduct] = useState<Product>({
        name: "",
        image: "",
        category: "kids",
        new_price: 0,
        old_price: 0,
    })
    let productAll : Product = {
        name: "",
        image: "",
        category: "kids",
        new_price: 0,
        old_price: 0,
    } ;
    useEffect(() => {
        // Perform action when 'image' state changes
        console.log("Image state has changed:", image);
        console.log(currentProduct)
        fetchProducts(currentProduct)
        
        // You can call any function or perform any action here
    }, [image])

    const [productDetails,setProductDetails] = useState({
        name: "",
        image: "",
        category: "kids",
        new_price: "",
        old_price: "",
    })

    const createFileFromPath = async (filePath: string): Promise<File | null> => {
        try {
            // Fetch the file content using the file path
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error('Failed to fetch file content');
            }
    
            // Read the file content as Blob
            const blob = await response.blob();
    
            // Create a File object with the Blob and file name
            let fileName = filePath.split('/').pop() || 'file';
            fileName = fileName.split('?')[0] || fileName;
            const file = new File([blob], fileName);
            return file;
        } catch (error) {
            console.error('Error creating file from path:', error);
            return null;
        }
    };

    const imageHandler = (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        file ? setImage(file) : setImage(null)
    }

    const fileHandler = (e: File | null) => {
        const file = e
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
            console.log("Hey")
            console.log(image)
            formData.append('product', image)
        }

        console.log(formData)
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
            console.log(product);
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

    const addAllProducts = async ()=>{
        console.log(all_products)
        let products : Product[] = all_products;

        for (let i = 0; i < products.length ; i++){
           await addProducts(products[i])
            // console.log(products[i])
        }
    }

    const addProducts = async (product: Product) => {

            // Ensure the product image exists
            if (!product.image) {
                throw new Error('Product image is missing');
            }
            const file = await createFileFromPath(product.image)
        
            console.log("images")
            console.log(product)

         
            setProduct(product)
            setImage(file)

        
        
    }

    const fetchProducts = async (productAll : Product) =>{
         // Create FormData object
         let formData = new FormData();
    
         // Append the product image to the FormData object
        
         if (image){
             formData.append('product',image)
         }
         
         console.log(image)
         // Send the FormData with fetch
         const resp = await fetch('http://localhost:4000/upload', {
             method: 'POST',
             headers: {
                 // Ensure correct headers for FormData
                 Accept: 'application/json',
             },
             body: formData,
         });


         const responseData = await resp.json();

     if (responseData?.success)
     {
        console.log(productAll)
         productAll.image = responseData?.image_url;
         console.log(productAll.image)
         console.log(productAll);
         const storeProduct = await fetch('http://localhost:4000/addproduct',{
             method: 'POST',
             headers:{
                 Accept: 'application/json',
                 "Content-Type" : 'application/json',
             },
             body: JSON.stringify(productAll),
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
            <input onChange={() => {}} type="file" name='image' id='file-input' hidden/>
        </div>

        <button onClick={() => {addProduct()}} className='addproduct-btn'>ADD</button>
        <button onClick={() => {addAllProducts()}} className='addproduct-btn'>ADD ALL</button>
      </div>
    </div>
  )
};

export default AddProduct;
