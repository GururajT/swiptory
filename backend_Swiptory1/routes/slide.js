const express=require('express')
const verifyToken=require('./../middleware/authMiddleware')
const Router= express.Router()
const userSlide=require('../controller/slide')
Router.post('/create', verifyToken, async (req, res) => {
    try {
        const postData = {
            slides: req.body.slides,
            category:req.body.category
        };
        await userSlide.createPost(postData, req.userId); // Pass userId to userSlide.createPost function
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: "Internal server error"});
}
});
Router.get('/details/:category',userSlide.getPostsByCategory)
Router.get('/details/:Id',userSlide.getPostById)
Router.get('/get/:id',userSlide.getByPostId)
Router.post('/update/:Id',userSlide.updatePost)
Router.post('/delete/:Id',userSlide.deletePost)
module.exports=Router