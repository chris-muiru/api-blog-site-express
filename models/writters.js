const { DataTypes } = require("sequelize")
const createWritter = (sequelize) => {
	return (Writter = sequelize.define("Writter", {
		isStaff: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	}))
}
module.exports = createWritter
