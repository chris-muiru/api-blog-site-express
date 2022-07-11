const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
	return sequelize.define("ConnectSession", {
		sid: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		expires: DataTypes.DATE,
	})
}
