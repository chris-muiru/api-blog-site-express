const express = require("express")
const router = express.Router()
const { Blog } = require("../models/db")
router
	.route("")
	.get(async (req, res) => {
		const getBlogs = await Blog.findAll()
		res.json(getBlogs)
	})
	.post(async (req, res) => {
		try {
			const createBlog = await Blog.create(req.body)
			res.status(200).json({ status: "blog created" })
		} catch (e) {
			if (e.name == "SequelizeUniqueConstraintError") {
				res.status(403).json({ err: "user already created" })
			} else {
				res.status(500).json({ err: "an error occured" })
			}
		}
	})
router
	.route("/:id")
	.get(async (req, res) => {
		let { id: blogId } = req.params
		try {
			const getBlog = await Blog.findAll({ where: { id: blogId } })
			res.status(200).json(getBlog)
		} catch (e) {
			res.status(500).json({ err: "an error occured" })
		}
	})
	.put(async (req, res) => {
		let { id: blogId } = req.params
		try {
			const updateBlog = await Blog.update(req.body, {
				where: {
					id: blogId,
				},
			})
			res.status(201).json({ message: "successfully created" })
		} catch (e) {
			res.status(404).json({ err: "invalid data" })
		}
	})
	.delete(async (req, res) => {
		let { id: blogId } = req.params
		try {
			const deleteBlog = await Blog.destroy({
				where: {
					id: blogId,
				},
			})
			res.status(201).json({ message: "successfully deleted" })
		} catch (e) {
			res.status(500).json({ err: "internal server error" })
		}
	})
module.exports = router
