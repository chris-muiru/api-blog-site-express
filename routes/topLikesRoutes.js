const express = require("express")
const router = express.Router()
const { LikeModel } = require("../models/db")
router.get("", async (req, res) => {
	try {
		let likes = await LikeModel.findAll()
		res.status(200).json(likes)
	} catch (err) {
		res.status(404).json({ err: "an error occured" })
	}
})
module.exports = router
