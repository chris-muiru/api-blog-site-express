const express = require("express")
const sequelize = require("sequelize")
const router = express.Router()
const { LikeModel } = require("../models/db")

router
	.route("/:blogId")
	.get(async (req, res) => {
		const { blogId } = req.params
		try {
			let likes = await LikeModel.findAll({
				attributes: [
					[sequelize.fn("COUNT", sequelize.col("id")), "num_likes"],
				],
				where: {
					BlogId: blogId,
				},
			})
			res.status(201).json(likes)
		} catch (err) {
			console.log(err)
			res.status(500).json({ err: "internal server error" })
		}
	})
	.post(async (req, res, next) => {
		try {
			const { blogId } = req.params
			const confirmLike = await LikeModel({
				where: {
					BlogId: blogId,
                    UserId:null
				},
			})
			if (confirmLike) {
				const createLike = await LikeModel.create(req.body)
				res.status(201).json({ message: "liked" })
			} else {
				next()
			}
		} catch (err) {
            res.status(500).json({err:"internal server error"})
        }
	})

module.exports = router
