const { Sequelize } = require("sequelize")
const { DataTypes } = require("sequelize")
const createBlog = require("./blog")
const createCommentModel = require("./comment")
const createLikeModel = require("./like")
const createUser = require("./users")
const createWritter = require("./writters")
const connectSession = require("./authSessionModel")
const sequelize = new Sequelize("blog_site", "root", "mysql254", {
	host: "localhost",
	dialect: "mysql",
})
const testConnection = async () => {
	try {
		await sequelize.authenticate()
		console.log("Connection has been established successfully.")
		return true
	} catch (e) {
		console.log("unable to establish connection:", e)
		return false
	}
}
const User = createUser(sequelize)
const Writter = createWritter(sequelize)
const Blog = createBlog(sequelize)
const CommentModel = createCommentModel(sequelize)
const LikeModel = createLikeModel(sequelize)
const sessionStore = connectSession(sequelize)

User.hasOne(LikeModel)
LikeModel.belongsTo(User)
Blog.hasOne(LikeModel)
LikeModel.belongsTo(Blog)

User.hasOne(Writter, {
	onDelete: "CASCADE",
})
Writter.belongsTo(User, {
	foreignKey: {
		allowNull: false,
	},
})

Writter.hasOne(Blog, {
	onDelete: "CASCADE",
	foreignKey: {
		allowNull: false,
	},
})
Blog.belongsTo(Writter)

User.hasOne(CommentModel, {
	onDelete: "CASCADE",
})
CommentModel.belongsTo(User)
Blog.hasOne(CommentModel, {
	onDelete: "CASCADE",
})
CommentModel.belongsTo(Blog)

module.exports = {
	sequelize,
	User,
	Writter,
	Blog,
	CommentModel,
	LikeModel,
	sessionStore,
}
