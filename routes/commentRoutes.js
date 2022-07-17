const express = require("express")
const router = express.Router()
const { CommentModel } = require("../models/db")
router
	.route("/:blogId")
	.get(async (req, res) => {
		const { blogId } = req.params
		try {
			const getCommentsByBlogId = await CommentModel.findAll({
				where: {
					BlogId: blogId,
				},
			})
			res.status(201).json(getCommentsByBlogId)
		} catch (err) {
			console.log(err)
			res.status(500).json({ err: "internal server error" })
		}
	})
	.post(async (req, res) => {
		const { comment } = req.body
		const { blogId: BlogId } = req.params
		const UserId = req.user
		console.log(UserId)
		try {
			const createCommentByBlog = await CommentModel.create({
				comment,
				UserId,
				BlogId,
			})
			res.status(201).json({ message: "created successfully" })
		} catch (err) {
			res.status(404).json({ err: "incorrect data" })
		}
	})

router.route("/delete/:commentId").delete(async (req, res) => {
	const { commentId } = req.params
	console.log(commentId)
	try {
		const deleteCommentById = await CommentModel.destroy({
			where: {
				id: commentId,
			},
		})
		res.status(201).json({ message: "deleted comment successfully" })
	} catch (err) {
		console.log(err)
		res.status(500).json({ err: "internal server error" })
	}
})

module.exports = router
