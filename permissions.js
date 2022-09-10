// only allow authenticated users
const { User, CommentModel } = require("./models/db")
const checkAuthenticated = (req, res, next) => {
	// if (req.method == "GET") {
	// 	next()
	// } else
	if (!req.isAuthenticated()) {
		console.log("ok")
		res.status(401).send({ msg: "Unauthorized" })
	} else {
		next()
	}
}
const isWritterPermissionOrReadOnly = async (req, res, next) => {
	const user = await Writter.findOne({
		where: {
			UserId: req.user.id,
		},
	})
	if (req.method == "GET") {
		next()
	} else if (user) {
		next()
	} else {
		res.status(403).send({ msg: "Forbidden" })
	}
}
const isCommentCreatorOrReadOnly = async (req, res, next) => {
	const user = req.user
}
exports.checkAuthenticated = checkAuthenticated
exports.isWritterPermissionOrReadOnly = isWritterPermissionOrReadOnly
