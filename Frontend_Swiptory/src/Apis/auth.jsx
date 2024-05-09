import axios from "axios";
const backendUrl="http://localhost:3000/api/v1"

export const registerUser=async ({Username,password})=>{
    try {
        const reqUrl=`${backendUrl}/user/register`
        const response= await axios.post(reqUrl,{Username,password})
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const loginUser=async (Username,password)=>{
    try {
        const reqUrl=`${backendUrl}/user/login`
        const response= await axios.post(reqUrl,{Username,password})
        const token=response.data.token
        return response.data
    } catch (error) {
        console.log(error)
    }
}