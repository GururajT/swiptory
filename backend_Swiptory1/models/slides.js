const mongoose=require("mongoose")
const postSchema = new mongoose.Schema({
    slides: [
        {
            heading: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image_url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: true
    },
    posted_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

module.exports = mongoose.model('Post',postSchema);