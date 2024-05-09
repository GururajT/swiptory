const express=require('express')
const Router= express.Router()
const verifyToken=require('./../middleware/authMiddleware')
const postLikes=require('../controller/postLike')
Router.post('/like-post/:postId/:type',verifyToken,async (req, res) => {
    try {
        const {postId,type}=req.params;
        await postLikes.updatePostLikes(req.userId, postId,type); // Pass userId to userSlide.createPost function
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: "Internal server error"});
}
})
Router.get('/post-likes/:postId',async (req, res) => {
    try {
        const {postId}=req.params;
        const postLike=await postLikes.getLikesByPostId(postId); // Pass userId to userSlide.createPost function
        res.status(201).json({ postLike: postLike });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: "Internal server error"});
}
})
module.exports=Router