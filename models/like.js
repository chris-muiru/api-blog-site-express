const { DataTypes } = require("sequelize")
const createLikeModel = (sequelize) => {
	return sequelize.define("Like", {
		type: DataTypes.BOOLEAN,
	})
}
module.exports = createLikeModel
