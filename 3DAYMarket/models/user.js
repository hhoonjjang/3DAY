const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
          unique: true,
          allowNull: false,
        },
        userPw: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(20),
          unique: true,

          allowNull: false,
        },
        userLocal: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Item, {
      foreignKey: "seller_id",
      sourceKey: "name",
      as: "Item",
    });
  }
};
