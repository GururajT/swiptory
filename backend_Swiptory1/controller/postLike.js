const postLike=require('../models/postLike.js')
const postLikedBy=require('../models/postLikedBy.js')
async function updatePostLikes(userId, postId,type) {
    try {

        const post = await postLike.findOne({post:postId});
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
                let likes=post.likes
                post.likes=likes+1
                await post.save()
                const likedPost=new postLikedBy({post:postId,user:userId});
                await likedPost.save()
            }
            else if(type=="dislike" && post.likes>0){
                let likes=post.likes
                post.likes=likes-1
                await post.save()
                await postLikedBy.deleteOne(query);
            }

        }
        console.log('Post updated successfully:', post);
        return post;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}
async function getLikesByPostId(postId) {
    try {
        const  likes= await postLike.findOne({ post: postId });
        return likes;
    } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
        throw error;
    }
}
module.exports={updatePostLikes,getLikesByPostId}