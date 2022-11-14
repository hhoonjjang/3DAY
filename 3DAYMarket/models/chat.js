const Sequelize = require("sequelize");

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
        },
        text: {
          type: Sequelize.TEXT,
        },
        partnerId: {
          type: Sequelize.STRING(20),
        },
        time: {
          type: Sequelize.STRING(20),
        },
      },
      {
        sequelize,
        timestamps: false,
        paranoid: true,
        underscored: true,
        modelName: "Chat",
        tableName: "chat",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  // static associate(db) {
  //   db.Chat.belongsTo(db.Item, {
  //     foreignKey: "partner_id",
  //     targetKey: "seller_id",
  //   });
  // }
};
