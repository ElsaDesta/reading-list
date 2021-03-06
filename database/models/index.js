const Sequelize = require("sequelize");

const { host, user, password, name, dialect } = require("../configs/db.config");

const connector = new Sequelize(name, user, password, {
  host,
  dialect,
});

connector
  .authenticate()
  .then(() => console.log(`Connection to database is successful`))
  .catch((err) =>
    console.error(`Connection to database was unsuccessful: ${err}`)
  );

const db = {};

db.Sequelize = Sequelize;
db.connector = connector;
db.book = require("./book.model")(Sequelize, connector);
db.readingList = require("./readingList.model")(Sequelize, connector);

db.book.belongsTo(db.readingList);

module.exports = db;
