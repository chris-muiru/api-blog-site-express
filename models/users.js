const { DataTypes } = require("sequelize")
const createUser = (sequelize) => {
	return sequelize.define("User", {
		username: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	})
}
module.exports = createUser
