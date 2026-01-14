const {getUser}= require("../service/auth")

async function restrictToLoggedinUserOnly(req,res,next){
    
    const userUid=req.cookies?.uid;

    if(!userUid) return res.redirect("/login");
    const user =getUser(userUid);
console.log("USER IN MIDDLEWARE:", user);console.log("URL =>", req.path, "| USER =>", req.user?.email);

    if(!user) return res.redirect("/login");

    req.user=user;
    next();
}

async function checkAuth(req,res,next){
    const userUid=req.cookies?.uid;

    
    const user =getUser(userUid);
console.log("USER IN MIDDLEWARE:", user);
    

    req.user=user;
    next();
}


module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,
}