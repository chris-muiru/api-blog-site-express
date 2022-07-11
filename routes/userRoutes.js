const express = require("express")
const { User } = require("../models/db")
const router = express.Router()
router.route("").post(async (req, res) => {
	try {
		let user = await User.create(req.body)
		res.status(200).json(user)
	} catch (err) {
		res.status(500).json({ err: "internal server error" })
	}
})
module.exports = router
