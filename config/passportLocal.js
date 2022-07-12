const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const { User } = require("../models/db")

const getUserName = async (name) => {
	const user = await User.findOne({
		where: {
			username: name,
		},
	})

	return user
}
const getUserById = async (userId) => {
	const user = await User.findOne({
		where: {
			id: userId,
		},
	})
	return user.id
}
const initializePassport = (passport) => {
	const authenticateUser = async (username, password, done) => {
		/**
		 * verify function - to authenticate user
		 */
		const user = await getUserName(username)

		if (user == null) {
			return done(null, false, { msg: "no user with that username" })
		}
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user)
			} else {
				return done(null, false, { msg: "password incorrect" })
			}
		} catch (err) {
			return done(err)
		}
	}
	passport.use(
		new LocalStrategy(
			{
				usernameField: "username",
			},
			authenticateUser
		)
	)
	passport.serializeUser((user, done) => {
		// serialize user to store into session
		return done(null, user.id)
	})
	passport.deserializeUser((id, done) => {
		return done(null, getUserById(id))
	})
}
module.exports = initializePassport
