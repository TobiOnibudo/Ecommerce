import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import path from 'path';
import multer from "multer";
import cors from "cors";
import {Product,User} from "./Model/Product.js"; 

const port = process.env.port || 4000;

dotenv.config();
const userName = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const maxCartItems = process.env.MAXIMUM_CART_ITEMS
const salt = process.env.SALT
const app = express();
app.use(express.json());
app.use(cors());


//Database Connection with mongoDB
mongoose.connect(`mongodb+srv://${userName}:${dbPassword}@cluster0.apvwpun.mongodb.net/e-commerce`)

//API creation

app.get('/', (req, res) => {
    res.send(`Hello World! ${userName}`)
})


//Image Storage Engine
const diskStorage = multer.diskStorage(
    {
        destination : './upload/images',
        filename: (req,file,cb) =>{ 
            const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
            req.uploadedFileName = filename; // Store filename without the parameter in request object
            return cb(null, filename)
        }
    }
)

const upload =multer({storage : diskStorage})

//Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res) =>{
    res.json({
        success : 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products
app.post('/addProduct',async(req,res) =>{
    let products = await Product.find({});
    let id;
    if (products.length > 0)
    {
        let last_product = products.slice(-1)[0];
        id = last_product.id+1;
    }
    else{
        id = 1
    }
    const data = req.body
    console.log(data.image)
    const product = new Product({
        id: id,
        name: data.name,
        image: data.image,
        category: data.category, 
        new_price : data.new_price,
        old_price : data.old_price,
    })

    console.log(product)
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API Endpoint for deleting Products
app.post('/deleteproduct', async (req,res)=>{
    await Product.findOneAndDelete({id: req.body.id})
    console.log("Deleted");

    res.json({
        success: true,
        name: req.body.name,
    })
})

//Creating API Endpoint for getting all products
app.get('/allproducts', async(req,res)=> {
    let products = await Product.find({})
        console.log("All Proucts Fetched");
        res.send(products);
})

// Creating API Endpoint for updating a product
app.put('/product/:id', async(req,res) => {
    const productId = req.params.id;
    const updateData = req.body;
    console.log(productId)
      try {
        const updatedProduct = await Product.findOneAndUpdate({ id: productId }, updateData, { new: true });
        console.log("Found and Updated");
        console.log(updatedProduct)
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Save the updated product to the database
        await updatedProduct.save();
        
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Creating Endpoint for registering the user
app.post('/signup',async(req,res) => {
    let check = await User.findOne({email: req.body.email})

    if(check){
        return res.status(400).json({
            success: false,
            error: "This email is associated with an existing User."
        })
    }
    let cart = {}
    for (let i = 0; i < maxCartItems; i++) {
       cart[i] = 0 
    }

    const user = new User({
        name : req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData : cart,
    })

    await user.save();

    const data = {
        user : {
            id : user.id,
        }
    }
    const token = jwt.sign(data,salt)

    res.json({success: true,token})
})

// Creating endpoint for user login
app.post('/login', async(req,res)=>{
    let user = await User.findOne({email: req.body.email})
    if (user)
    {
        const passCompare = req.body.password == user.password
       
        if (passCompare ){
            const data = {
                user: {
                    id : user.id,
                }
            }
        const token = jwt.sign(data,salt)
        res.json({success:true,token})
        }
        else if (!passCompare )
        {
            res.json({
                success: false,
                error:"Wrong Password ",
            })
        }
    }
    else
    {
        res.json({
            success: false,
            error:"Wrong Email Id",
        })
    }
})

// creating endpoint for newcollection data
app.get("/newcollection",async(req,res)=>{
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log("NewCollection Fetched")
    res.send(newcollection)   
});

// creating endpoint for popular in women section
app.get('/popular/women',async (req,res)=>{
    let products = await Product.find({category: "women"})
    let popular_in_women = products.slice(0,4)
    console.log("Popular in women fetched")
    res.send(popular_in_women)
})

//creating middle ware to fetch user
    const fetchUser = async(req,res,next) => {
        const token = req.header('auth-token')
        if(!token){
            res.status(401).send({errors: "Please authenticate using valid token"})
        }
        else {
            try{
                const data =  jwt.verify(token,salt)
                req.user = data.user;
                next();
            } catch (error){
                res.status(401).send({errors:"please authenticate using a valid token"})
            }
        }
    }


// creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async (req,res) =>{
    let userData = await User.findOne({_id: req.user.id})
    userData.cartData[req.body.itemId] += 1
    await User.findOneAndUpdate({_id : userData._id},{cartData: userData.cartData})
   res.send(`${req.body.itemId}`)
})

// creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res) => {
    let userData = await User.findOne({_id: req.user.id})
    if (userData.cartData[req.body.itemId] > 0)
    {
        userData.cartData[req.body.itemId] -= 1
    }
    
    await User.findOneAndUpdate({_id : userData._id},{cartData: userData.cartData})
   res.send(`${req.body.itemId}`)
})

app.listen(port,(error) =>
{
    !error ? console.log(`Server Running on Port ${port}`) : 
    console.log(`Error: ${error}`)
})