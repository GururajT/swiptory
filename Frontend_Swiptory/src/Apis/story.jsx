import axios from "axios";
const backendUrl="http://localhost:3000/api/v1"

export const addStory= async (story)=>{
    try {
        const reqUrl='http://localhost:3000/api/v1/story/create'
        const token = localStorage.getItem("token");
        console.log(token)
        console.log(story)
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response= await axios.post(reqUrl,story);
        return response.data
    } catch (error) {
        console.log(error)        
    }
}
export const getStory= async (category)=>{
    try {
        const reqUrl=`http://localhost:3000/api/v1/story/details/${category}`
        const response= await axios.get(reqUrl,category);
        return response.data
    } catch (error) {
        console.log(error)        
    }
}
export const postLikes= async (id,type)=>{
    try {
        const reqUrl=`http://localhost:3000/api/v1/postLike/like-post/${id}/${type}`
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response= await axios.post(reqUrl,{});
        return response.data
    } catch (error) {
        console.log(error)        
    }
}
export const checkPostLike= async (id)=>{
    try {
        const reqUrl=`http://localhost:3000/api/v1/postLikedBy/check-post-like/${id}`
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response= await axios.get(reqUrl,{});
        return response.data
    } catch (error) {
        console.log(error)        
    }
}
export const getPostLike= async (id)=>{
    try {
        const reqUrl=`http://localhost:3000/api/v1/postLike/post-likes/${id}`
        const response= await axios.get(reqUrl,{});
        return response.data
    } catch (error) {
        console.log(error)        
    }
}
export const postBookmark= async (id,type)=>{
    try {
        const reqUrl=`http://localhost:3000/api/v1/bookmark/bookmark-post/${id}/${type}`
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response= await axios.post(reqUrl,{});
        return response.data
    } catch (error) {
        console.log(error)        
    }
}
export const checkPostBookmarked= async (id)=>{
    try {
        const reqUrl=`http://localhost:3000/api/v1/bookmarkedBy/check-post-bookmark/${id}`
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response= await axios.get(reqUrl,{});
        return response.data
    } catch (error) {
        console.log(error)        
    }
}
export const getMybookmarks= async ()=>{
    try {
        const reqUrl='http://localhost:3000/api/v1/bookmark/get-my-bookmarks'
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `${token}`;
        const response= await axios.get(reqUrl,{});
        return response.data
    } catch (error) {
        console.log(error)        
    }
}
