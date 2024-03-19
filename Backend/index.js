import {Product} from "Model/Product.mjs"

require('dotenv').config();
const express = require("express");
const port = process.env.port || 4000;
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")

const userName = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

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
            return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
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
    const data = req.body
    const product = new Product({
        id: data.id,
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

app.listen(port,(error) =>
{
    !error ? console.log(`Server Running on Port ${port}`) : 
    console.log(`Error: ${error}`)
})