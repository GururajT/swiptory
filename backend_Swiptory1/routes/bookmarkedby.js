const express=require('express')
const Router= express.Router()
const verifyToken=require('./../middleware/authMiddleware')
const postbookmarkedBy=require('../controller/bookmarkedBy')
Router.get('/check-post-bookmark/:postId',verifyToken,async (req, res) => {
    try {
        const {postId}=req.params;
        await postbookmarkedBy.getPostbookmarksBy(req,res,postId, req.userId); // Pass userId to userSlide.createPost function
        // res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: "Internal server error"});
}
})
module.exports=Router