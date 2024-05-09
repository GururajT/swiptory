const mongoose=require("mongoose")
const bookmarkschema = new mongoose.Schema({
    bookmarks:{
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

module.exports = mongoose.model('postbookmarked',bookmarkschema);