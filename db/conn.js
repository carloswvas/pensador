const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('tought','root','root',{
  host:'127.0.0.1',
  port:3306,
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('MYSQL Conectado')
} catch (error) {
  console.log(`Erro ao conectar: ${error}`)
}

module.exports = sequelize
