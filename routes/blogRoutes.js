const express = require("express")
const router = express.Router()
const { Blog, User } = require("../models/db")
/**
 * @openapi
 * /:
//  *   get:
//  *     description: Welcome to swagger-jsdoc!
//  *     responses:
//  *       200:
//  *         description: Returns a mysterious string.
 */
const getWritter = async (req) => {
	const user = await Writter.findOne({
		where: {
			UserId: req.user.id,
		},
	})
	return user.id
}
router
	.route("")
	.get(async (req, res) => {
		const getBlogs = await Blog.findAll()
		res.status(200).json(getBlogs)
	})
	.post(async (req, res) => {
		try {
			const createBlog = await Blog.create({
				...req.body,
				WritterId: await getWritter(req),
			})
			res.status(200).json({ status: "blog created" })
		} catch (e) {
			if (e.name == "SequelizeUniqueConstraintError") {
				res.status(403).json({ err: "blog already created" })
			} else {
				console.log(e)
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
