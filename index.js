const express=require("express");
const {connectToMongoDb}=require('./connect');
const urlRoute=require('./routes/url');
const Url= require('./models/url')
const app=express();
const PORT=8001;


connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongo connected"))


app.use(express.json())
app.use('/url',urlRoute);

app.get('/:shortId', async (req,res)=>{
    const shortId=req.params.shortId;
    const entry =await Url.findOneAndUpdate({
        shortId,
    },{$push:{
        visitorClicks:{
            timestamp:Date.now(),
        },
    },
},
);
res.redirect(entry.redirectUrl)
})
app.listen(PORT,()=>console.log("server connected successfully",PORT))
