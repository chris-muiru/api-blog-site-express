const express = require("express")
const dotenv = require("dotenv")
const { sequelize } = require("./models/db")
const { request } = require("express")
const blogRoutes = require("./routes/blogRoutes.js")
sequelize.sync({ alter: true })

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/dash", blogRoutes)
app.listen(PORT, () => {
	console.log(`connected successfully on port ${PORT}`)
})
