const express = require("express")
const passport = require("passport")
const cors = require("cors")
const dotenv = require("dotenv")
const { sequelize } = require("./models/db")
const { request } = require("express")
const blogRoutes = require("./routes/blogRoutes.js")
const commentRoutes = require("./routes/commentRoutes")
const likeRoutes = require("./routes/likeRoutes")
const userRoutes = require("./routes/userRoutes")
const writtersRoutes = require("./routes/writtersRoute")
const session = require("express-session")
const initializePassport = require("./config/passportLocal")
initializePassport(passport)

sequelize.sync()

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
app.use(
	cors({
		origin: "http://localhost:3000",
	})
)
app.use(
	session({
		name: "blogpostAuth",
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 3600000 },
	})
)
const checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log(res.user)
		// res.redirect("/dash")
		next()
	} else {
		console.log(req.user)
		// res.redirect("/login")
		next()
	}
}

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/auth/login", (req, res, next) => {
	passport.authenticate("local", (err, user) => {
		if (err) throw err
		req.logIn(user, (loginError) => {
			if (loginError) {
				res.status(404).send({ msg: "wrong credentials" })
			} else if (user) {
				res.status(200).send({ msg: "authenticated" })
			}
		})
	})(req, res, next)
})

app.use(checkAuthenticated)
app.use("/dash", blogRoutes)
app.use("/comment", commentRoutes)
app.use("/like", likeRoutes)
app.use("/auth/signup/", userRoutes)
app.use("/writter", writtersRoutes)

app.listen(PORT, () => {
	console.log(`connected successfully on port ${PORT}`)
})
