import mongoose, { Types } from "mongoose";

const incomeschema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"usermodel" ,required:true},
    icon:{type:String},
    source:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now}
},{timestamps:true})

const incomemodel=mongoose.model("income",incomeschema)
export default incomemodel;