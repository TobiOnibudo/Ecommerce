import { productSchema } from "../Schema/Product.js"
import mongoose from "mongoose"
const Product = mongoose.model("Product",productSchema)

export default Product