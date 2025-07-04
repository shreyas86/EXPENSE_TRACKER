import mongoose from "mongoose";

const expenseschema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"usermodel", required:true},
    icon:{type:String},
    category:{type:String, required:true},
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now}
},{timestamps:true})

const expensemodel=mongoose.model("expense",expenseschema)
export default expensemodel;