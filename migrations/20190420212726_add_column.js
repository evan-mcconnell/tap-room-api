
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('keg', function(table){
      table.integer('fill');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('keg', function(table){
      table.dropColumn('fill');
    })
  ])
};
