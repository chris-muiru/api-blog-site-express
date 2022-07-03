const express = require("express")
const router = express.Router()
const { Blog } = require("../models/db")
router
	.route("")
	.get(async (req, res) => {
		const blogs = await Blog.findAll()
		res.json(blogs)
	})
	.post(async (req, res) => {
		console.log(req.body)
		try {
			const blog = Blog.create(req.body)
			res.status(200).json(blog)
		} catch (e) {
			throw e
		}
	})
module.exports = router
