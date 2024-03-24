import { productSchema , UserSchema} from "../Schema/Product.js"
import mongoose from "mongoose"
export const Product = mongoose.model("Product",productSchema)
export const User = mongoose.model("User",UserSchema)


export default Product