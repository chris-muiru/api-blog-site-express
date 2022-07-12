const express = require("express")
const passport = require("passport")
const dotenv = require("dotenv")
const flash = require("express-flash")
const { sequelize } = require("./models/db")
const { request } = require("express")
const blogRoutes = require("./routes/blogRoutes.js")
const commentRoutes = require("./routes/commentRoutes")
const likeRoutes = require("./routes/likeRoutes")
const userRoutes = require("./routes/userRoutes")
const session = require("express-session")
// const SequelStore = require("sequelstore-connect")(session)
const initializePassport = require("./config/passportLocal")
initializePassport(passport)

sequelize.sync()

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
app.use(flash())
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/dash",
		failureRedirect: "/login",
		failureFlash: true,
	})
)
app.use("/dash", blogRoutes)
app.use("/comment", commentRoutes)
app.use("/like", likeRoutes)
app.use("/user", userRoutes)
app.listen(PORT, () => {
	console.log(`connected successfully on port ${PORT}`)
})
