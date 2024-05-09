const mongoose=require("mongoose")
const likeSchema = new mongoose.Schema({
    likes:{
        type:Number,
        required:true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
},{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

module.exports = mongoose.model('postLike',likeSchema);