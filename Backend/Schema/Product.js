import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    id: {
        type : Number,
        required : true,
    },
    name : {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required: true,
    },
    old_price:{
        type:Number,
        required: true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    available:{
        type:Boolean,
        default: true,
    },
})

export const UserSchema = new mongoose.Schema({
    name: {
       type: String, 
    },
    email: {
        type: String,
        unique: true,
    },
    password:{
        type:String,
    },
    cartData: {
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now(),
    },
})