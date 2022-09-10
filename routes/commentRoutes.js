const express = require("express")
const router = express.Router()
const { CommentModel } = require("../models/db")
router
	.route("/:blogId")
	// get comment based on blogId
	.get(async (req, res) => {
		const { blogId } = req.params
		try {
			const getCommentsByBlogId = await CommentModel.findAll({
				where: {
					BlogId: blogId,
				},
			})
			res.status(200).json(getCommentsByBlogId)
		} catch (err) {
			console.log(err)
			res.status(500).json({ err: "internal server error" })
		}
	})
	// create comment
	.post(async (req, res) => {
		const { comment } = req.body
		const { blogId: BlogId } = req.params
		const UserId = req.user.id
		try {
			const createCommentByBlog = await CommentModel.create({
				comment,
				UserId,
				BlogId,
			})
			res.status(200).json({ message: "created successfully" })
		} catch (err) {
			res.status(404).json({ err: "incorrect data" })
		}
	})
// delete comment
router
	.route("/update/:commentId")
	.get(async (req, res) => {
		const { commentId } = req.params
		try {
			const comment = await CommentModel.findAll({
				where: {
					id: commentId,
				},
			})
			res.status(200).json(comment)
		} catch (err) {
			res.status(500).json({ err: "internal server error" })
		}
	})
	.put(async (req, res) => {
		const { commentId } = req.params
		try {
			const comment = await CommentModel.update(req.body, {
				where: {
					id: commentId,
				},
			})
			let [result] = comment
			if (result === 1) {
				res.status(200).json({ message: "successfully updated" })
			} else {
				res.status(400).json({ message: "bad request" })
			}
		} catch (err) {
			res.status(500).json({ err: "internal server error" })
		}
	})
	.delete(async (req, res) => {
		const { commentId } = req.params
		console.log(commentId)
		try {
			const deleteCommentById = await CommentModel.destroy({
				where: {
					id: commentId,
				},
			})
			res.status(200).json({ message: "deleted comment successfully" })
		} catch (err) {
			console.log(err)
			res.status(500).json({ err: "internal server error" })
		}
	})

module.exports = router
