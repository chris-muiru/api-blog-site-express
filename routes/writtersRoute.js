const express = require("express")
const router = express.Router()
const { Writter } = require("./../models/db")
router
	.route("")
	.get(async (req, res) => {
		try {
			const writters = await Writter.findAll()
			res.status(200).json(writters)
		} catch (e) {}
	})
	.post(async (req, res) => {
		// create a writter
		const inputs = req.body
		const loggedUser = req.user.id
		try {
			const writterExist = await Writter.findOne({
				where: {
					UserId: loggedUser,
				},
			})
			if (!writterExist) {
				const response = await Writter.create({
					...inputs,
					UserId: loggedUser,
				})
				res.status(200).json({ msg: "created user" })
			} else {
				res.status(200).json({ msg: "writter already exists" })
			}
		} catch (err) {
			console.log(err)
			res.status(504).json({ msg: "server error" })
		}
	})

module.exports = router
