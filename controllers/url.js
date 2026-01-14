const shortid=require('shortid');
const Url=require("../models/url");



async function handleGenerateNewShortId(req,res){
 const body= req.body;
 if(!body.url) return res.status(400).json({error:"url is required"});

 const shortID=shortid();
 await Url.create({
    shortId: shortID,
    redirectUrl:body.url,
    visitorClicks:[],
    createdBy: req.user._id,
 });
 const allUrls=await Url.find({});
 return res.render("home" ,{urls: allUrls})
//  return res.json({id:shortId})
}
async function handleGetAnalytics(req,res){
   const shortId=req.params.shortId;
   const result=await Url.findOne({shortId});
   return res.json({
    totalClicks:result.visitorClicks.length,
    analytics:result.visitorClicks,})
}
module.exports={
    handleGenerateNewShortId,
    handleGetAnalytics,
}