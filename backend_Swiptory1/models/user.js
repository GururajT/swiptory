const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:{createdAt:"createdAt",updatedAt:"updatedAt"}}
)
module.exports=mongoose.model('User',userSchema)