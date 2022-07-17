const express = require("express")
const router = express.Router()
const { LikeModel } = require("../models/db")
router.get("", async(req, res) => {
    blogs=await LikeModel.findAll({
        
    }) 

})
