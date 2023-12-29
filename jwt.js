const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
const port=3001;
app.get('/api',(req,res)=>{
    res.json({
        message:'Welcome to the API'
    })
})
app.post('/api/posts',verifyTokeb,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message:'Post created',
                authData
            })
        }
    })
    res.json({
        message:'Post created'
    })
})

app.post('/api/login',(req,res)=>{
    const user={
        id:1,
        username:'brad',
        email:'brad@gmail.com',
    };
    jwt.sign({user:user},'secretkey',(err,token)=>{
        res.json({token:token})
    })


   

})
function verifyTokeb(req,res,next){
    const bearerHeader=req.headers['authorization'];
    if(bearerHeader!=undefined){
        const beareToken=bearerHeader.split(' ')[1];
        req.token=beareToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})