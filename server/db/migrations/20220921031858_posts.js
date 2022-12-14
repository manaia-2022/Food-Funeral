exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id')
    table.string('title')
    table.date('date_eaten')
    table.varchar('content')
    table.string('img')
    table.string('auth0_id')
    table.string('name')
    table.date('date_created')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
