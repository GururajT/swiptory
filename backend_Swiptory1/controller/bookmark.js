const bookmark = require('../models/bookmark.js');
const postbookmark=require('../models/bookmark.js')
const postbookmarkedBy=require('../models/bookmarkedby.js')
async function updatePostbookmarks(userId, postId,type) {
    try {

        const post = await postbookmark.findOne({post:postId});
        console.log("post",post,postId,"type",type)
        if (!post) {
            console.log('Post not found');
            return null;
        }
        else{
            const query={
                $and: [
                    { post: postId},
                    { user  : userId }
                    // Add more conditions if needed
        ]
        };
            if(type=="like"){
                let bookmarks=post.bookmarks
                post.bookmarks=bookmarks+1
                await post.save()
                const likedPost=new postbookmarkedBy({post:postId,user:userId});
                await likedPost.save()
            }
            else if(type=="dislike" && post.bookmarks>0){
                let bookmarks=post.bookmarks
                post.bookmarks=bookmarks-1
                await post.save()
                await postbookmarkedBy.deleteOne(query);
            }

        }
        console.log('Post updated successfully:', post);
        return post;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}
async function getBookmarkedPostsByUser(userId) {
    try {
        const bookmarks = await postbookmarkedBy.find({ user: userId }).populate('post');
        return bookmarks.map(bookmark => bookmark.post);
    } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
        throw error;
    }
}
module.exports={updatePostbookmarks,getBookmarkedPostsByUser}