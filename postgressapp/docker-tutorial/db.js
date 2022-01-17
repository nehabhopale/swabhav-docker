const knex = require('knex')

module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'dbpostgress',
    user: 'postgres',
    password: '123456',
    database: 'postgres',
    
  },
})
