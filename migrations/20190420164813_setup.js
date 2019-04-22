
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(`keg`, function(table){
      table.increments('id');
      table.string('name');
      table.string('brand');
      table.integer('price');
      table.decimal('alcoholContent');
      table.string('type');
      table.integer('fill');
    })
  ])
};

//exports down is a requirement for every up function with the purpose of UNDOING whatever the up function does, in this case deleting a table
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable(`keg`)
  ])
};
