
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(`users`, function(table){
      table.string('username');
      table.string('password');
      table.timestamps();
    })
  ])
};

//exports down is a requirement for every up function with the purpose of UNDOING whatever the up function does, in this case deleting a table
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable(`users`)
  ])
};
