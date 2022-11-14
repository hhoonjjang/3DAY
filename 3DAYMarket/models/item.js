const Sequelize = require("sequelize");

module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        imgArr: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        itemTitle: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        itemCategories: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        itemCondition: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        itemTuning: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },

        itemDealing: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        itemPrice: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        itemSubtitle: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        itemLocal: {
          type: Sequelize.STRING(20),
          //   allowNull: false,
        },
        itemBlack: {
          type: Sequelize.BOOLEAN,
          // allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Item",
        tableName: "items",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Item.belongsTo(db.User, {
      foreignKey: "seller_id",
      targetKey: "name",
    });
  }
  // static associate(db) {
  //   db.Item.hasMany(db.Chat, {
  //     foreignKey: "partner_id",
  //     sourceKey: "seller_id",
  //     as: "Chat",
  //   });
  // }
};
