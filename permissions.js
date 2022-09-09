// only allow authenticated users
const { User } = require("./models/db")
const checkAuthenticated = (req, res, next) => {
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
			UserId: req.user,
		},
	})
	if (user) {
		next()
	} else {
		res.status(403).send({ msg: "Forbidden" })
	}
}

exports.checkAuthenticated = checkAuthenticated
exports.isWritterPermissionOrReadOnly = isWritterPermissionOrReadOnly
