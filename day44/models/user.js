const Sequelize = require("sequelize");
module.exports = class username extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          // 객체 형식으로 저장
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING(15),
          unique: true,
          allowNull: false,
        },
        userPassword: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: true,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
