

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('keg', function(table){
      table.increments('id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('keg', function(table){
      table.dropColumn('id');
    })
  ])
};
