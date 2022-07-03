const { DataTypes } = require("sequelize")

const createBlog = (sequelize) => {
	
	return sequelize.define("Blog", {
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique:true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		blogType: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	})
}

module.exports = createBlog
