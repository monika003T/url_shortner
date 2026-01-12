const mongoose= require("mongoose")

const urlSchema=new mongoose.Schema(
    {
        shortId:{
            type:String,
            required:true,
            unique:true,

        },
        redirectUrl:{
            type:String,
            required:true,
        },
        visitorClicks:[
            {timestamp:Number}
        ],
    },
    
);
//model- use to connect schema to mongoose 
const Url=mongoose.model('Url',urlSchema)

module.exports=Url;

