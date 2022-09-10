const { DataTypes } = require("sequelize")
const bcrypt = require("bcrypt")
const createUser = (sequelize) => {
	return sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING(25),
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING(25),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			scopes: {
				withoutPassword: {
					attributes: { exclude: ["password"] },
				},
			},
		},
		{
			hooks: {
				beforeCreate: (user) => {
					if (user.password) {
						const salt = bcrypt.genSaltSync(10, "a")
						user.password = bcrypt.hashSync(user.password, salt)
					}
				},
				beforeUpdate: (user) => {
					if (user.password) {
						const salt = bcrypt.genSaltSync(10, "a")
						user.password = bcrypt.hashSync(user.password, salt)
					}
				},
			},
		}
	)
}
module.exports = createUser
