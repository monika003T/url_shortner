const express=require("express");
const path = require("path")
const {connectToMongoDb}=require('./connect');
const urlRoute=require('./routes/url');
const Url= require('./models/url')
const staticRoute=require('./routes/staticRouter');


const app=express();
const PORT=8001;


connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongo connected"))


//ejs
app.set('view engine',"ejs");
app.set('views',path.resolve("./views"));

// console.log(typeof urlRoute, urlRoute);

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/url',urlRoute);


app.get('/url/:shortId', async (req,res)=>{
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
});
app.use("/",staticRoute);
app.listen(PORT,()=>console.log("server connected successfully",PORT))
