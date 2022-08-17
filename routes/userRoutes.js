const express = require("express")
const { User } = require("../models/db")
const router = express.Router()
router.route("").post(async (req, res) => {
	try {
		const { username, email, password, passwordConfirm } = req.body
		console.log(req.body)
		const userExist = await User.findOne({
			where: {
				email: email,
			},
		})
		if (userExist) {
			res.status(200).json({ msg: `user exists` })
		} else {
			if (password === passwordConfirm) {
				let user = await User.create({ username, email, password })
				res.status(200).json({ msg: `user created` })
			} else {
				console.log("nope")
				res.status(200).json({ msg: "incorrect password" })
			}
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({ err: "internal server error" })
	}
})
module.exports = router
