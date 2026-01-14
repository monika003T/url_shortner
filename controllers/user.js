const User= require("../models/user")
const Url = require("../models/url")
const { v4: uuidv4 } = require('uuid');
const {setUser}= require("../service/auth")

 
async function handleUserSignUp(req,res){
     console.log("BODY:", req.body);
    const {name,email,password} =req.body;
    await User.create({
        name,
        email,
        password,
    });
    const urls = await Url.find(); 
    return res.render("home", {urls});
}
async function handleUserLogin(req,res){
    
    const {name,email,password} =req.body;
    const user= await User.findOne({email,password});
    if(!user) return res.render("login",{
        error:"invalid username or password",
    });

    const sessionid=uuidv4();
    setUser(sessionid,user);
    res.cookie('uid',sessionid);
    return res.redirect('/');
}
module.exports= {
    handleUserSignUp,
    handleUserLogin,
}