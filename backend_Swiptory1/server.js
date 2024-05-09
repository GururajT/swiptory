const express=require('express')
const mongoose=require('mongoose')
const app=express()
require('dotenv').config();
const cors=require("cors")
const user=require('./routes/user')
const story=require('./routes/slide')
const postlikes=require('./routes/postLikes')
const bookmark=require('./routes/bookmark');
const bookmarkedBy=require('./routes/bookmarkedby');
const postLikedBy = require('./routes/postLikedBy');
port=3000

app.use(cors())
app.use(express.json());
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Db connected')
}).catch((error) => {
    console.log(error)
});
app.get('/',(req,res)=>{
    console.log('server started')
    res.json({
        message:'server started',
        active:true,
        time:new Date()
    })
})
app.use('/api/v1/user',user)
app.use('/api/v1/story',story)
app.use('/api/v1/postLike',postlikes)
app.use('/api/v1/postLikedBy',postLikedBy)
app.use('/api/v1/bookmark',bookmark)
app.use('/api/v1/bookmarkedBy',bookmarkedBy)
app.listen(port,(error)=>{
    console.log(`server successfully started at ${port}`)
})