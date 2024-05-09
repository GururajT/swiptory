const postbookmarkedBy=require('../models/bookmarkedby.js')
async function getPostbookmarksBy(req,res,postId,userId) {
    try {
        const query={
            $and: [
                { post: postId},
                { user  : userId }
                // Add more conditions if needed
    ]
    };
        const post = await postbookmarkedBy.findOne(query);
        let postType=false
        if (!post) {
            console.log('Post not found');
            
        }
        else{
                postType=true
            }
        res.status(200).json({"isBookmarked":postType});
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server Error' });
        }
      };

module.exports={getPostbookmarksBy}