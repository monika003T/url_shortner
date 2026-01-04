const shortid=require('shortid');
const Url=require("../models/url")
async function handleGenerateNewShortId(req,res){
 const body= req.body;
 if(!body.url) return res.status(400).json({error:"url is required"});

 const shortId=shortid();
 await Url.create({
    shortId: shortId,
    redirectUrl:body.url,
    visitorClicks:[],
 });
 return res.render('Homee',{
     
    id:shortId,
 })
//  return res.json({id:shortId})
}
async function handleGetAnalytics(req,res){
   const shortId=req.params.shortId;
   const result=await URL.findByIdAndUpdate({shortId});
   return res.json({totalClicks:result.visitorClicks.length,
    analytics:result.visitorClicks,})
}
module.exports={
    handleGenerateNewShortId,
    handleGetAnalytics,
}