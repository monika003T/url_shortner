const express=require("express");
const {handleGenerateNewShortId,
    handleGetAnalytics,
} = require('../controllers/url')
const router=express.Router();


router.post('/',handleGenerateNewShortId);
router.get('/analyatics/url/:shortId',handleGetAnalytics)

module.exports=router;