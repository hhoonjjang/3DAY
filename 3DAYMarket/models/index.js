"use strict";
const Sequelize = require("sequelize");

const User = require("./user.js");
const Item = require("./item.js");

const Chat = require("./chat.js");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = { User, Item, Chat };


let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

User.init(sequelize);
Item.init(sequelize);
Chat.init(sequelize);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
