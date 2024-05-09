const express=require('express')
const Router= express.Router()
const verifyToken=require('./../middleware/authMiddleware')
const postbookmarks=require('../controller/bookmark')
Router.post('/bookmark-post/:postId/:type',verifyToken,async (req, res) => {
    try {
        const {postId,type}=req.params;
        await postbookmarks.updatePostbookmarks(req.userId, postId,type); // Pass userId to userSlide.createPost function
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: "Internal server error"});
}
})
Router.get('/get-my-bookmarks',verifyToken,async (req, res) => {
    try {
        const bookmarks= await postbookmarks.getBookmarkedPostsByUser(req.userId); // Pass userId to userSlide.createPost function
        res.status(201).json({ bookmarks: bookmarks });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: "Internal server error"});
}
})
module.exports=Router