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
const { checkAuthenticated } = require("./permissions")
const session = require("express-session")
const initializePassport = require("./config/passportLocal")
const { isWritterPermissionOrReadOnly } = require("./permissions")

initializePassport(passport)

// add swagger
const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "blog site api express",
			version: "1.0.0",
		},
	},
	apis: ["./routes/*.js", "index.js"],
}
const swaggerSpec = swaggerJSDoc(swaggerOptions)

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
		cookie: { maxAge: 3600000000 },
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/auth/login", (req, res, next) => {
	passport.authenticate("local", (err, user) => {
		if (err) throw err
		req.logIn(user, (loginError) => {
			if (loginError) {
				res.status(404).send({ msg: "user not found" })
			} else if (user) {
				res.status(200).send({ msg: "authenticated" })
			}
		})
	})(req, res, next)
})
app.use("/auth/signup/", userRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(checkAuthenticated)
app.use("/blog", isWritterPermissionOrReadOnly, blogRoutes)
app.use("/blog/comment", commentRoutes)
app.use("/blog/like", likeRoutes)
app.use("/writter", writtersRoutes)

app.listen(PORT, () => {
	console.log(`connected successfully on port ${PORT}`)
})

// TODO: check Morgan,wiston
