const express=require("express");
const path = require("path")
const {connectToMongoDb}=require('./connect');

//routes
const urlRoute=require('./routes/url');
const Url= require('./models/url')
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user')


const app=express();
const PORT=8001;


connectToMongoDb('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongo connected"))

app.get('/',async (req,res)=>{
    const allUrls=await Url.find({});
    return res.render("home",{
        urls:allUrls,
    })

    /* return res.end(`
        <html>
        <head>
        <body>
        <ol>${allUrls.map(url=>`<li>${url.shortId} - ${url.redirectUrl} - ${url.visitorClicks.length}</li>`).join('')}</ol>
        </body>
        </head>
        </html>`) */
});
//ejs
app.set('view engine',"ejs");
app.set('views', path.resolve("./views"));

// console.log(typeof urlRoute, urlRoute);

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/url',urlRoute);
app.use('/user',userRoute);
app.use("/",staticRoute);


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

app.listen(PORT,()=>console.log("server connected successfully",PORT))
