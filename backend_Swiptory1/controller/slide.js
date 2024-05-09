const PostLike = require('../models/postLike.js');
const Post=require('../models/slides.js')
const postbookmark=require('../models/bookmark.js')
async function createPost(postData, userId) {
    try {
        const post = new Post({
            ...postData,
            posted_by: userId
        });
        await post.save();
        const postLike = new PostLike({
            likes:0,
            post:post
        });
        await postLike.save();
        const postBookmark = new postbookmark({
            bookmarks:0,
            post:post
        });
        await postBookmark.save();
        console.log('Post created successfully:', post);
        return post;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}
async function getPostsByCategory (req, res, next){
    try {
      const { category } = req.params;
      if (category=="all"){
        const posts = await Post.find()// Replace 'username' with the field you want to populate from the User model
        res.status(200).json(posts);
      }
      else{
        const posts = await Post.find({ category })// Replace 'username' with the field you want to populate from the User model
      res.status(200).json(posts);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
async function getPostById(postId) {
    try {
        const post = await Post.findById(postId).populate('posted_by');
        if (!post) {
            console.log('Post not found');
            return null;
        }
        console.log('Post found:', post);
        return post;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}
async function getByPostId(req,res) {
    try {
        const post = await Post.findById(req.id);
        if (!post) {
            console.log('Post not found');
            return null;
        }
        console.log('Post found:', post);
        return post;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

// UPDATE operation
async function updatePost(postId, updatedData) {
    try {
        const post = await Post.findByIdAndUpdate(postId, updatedData, { new: true });
        if (!post) {
            console.log('Post not found');
            return null;
        }
        console.log('Post updated successfully:', post);
        return post;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

// DELETE operation
async function deletePost(postId) {
    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            console.log('Post not found');
            return null;
        }
        console.log('Post deleted successfully:', post);
        return post;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
    }
    module.exports={createPost,getPostById,updatePost,deletePost,getPostsByCategory,getByPostId}