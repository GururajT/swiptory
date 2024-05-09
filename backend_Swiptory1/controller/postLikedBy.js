const postLikedBy=require('../models/postLikedBy.js')
async function getPostLikesBy(req,res,postId,userId) {
    try {
        const query={
            $and: [
                { post: postId},
                { user  : userId }
                // Add more conditions if needed
    ]
    };
        const post = await postLikedBy.findOne(query);
        let postType=false
        if (!post) {
            console.log('Post not found');
            
        }
        else{
                postType=true
            }
        res.status(200).json({"isLiked":postType});
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      };

module.exports={getPostLikesBy}