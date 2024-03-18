import { productSchema } from "../Schema/Product"
const mongoose = require("mongoose")

export const Product = mongoose.model("Product",productSchema)