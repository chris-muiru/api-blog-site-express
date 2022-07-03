const { DataTypes } = require("sequelize")
const createCommentModel = (sequelize) => {
	return sequelize.define("Comment", {
		comment: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	})
}
module.exports = createCommentModel
