const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tought2", "root", "root", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectado ao MYSQL!");
} catch (error) {
  console.log(`Erro ao conectar ${error}`);
}

module.exports = sequelize;
