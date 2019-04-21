
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('keg').del()
    .then(function () {
      // Inserts seed entries
      return knex('keg').insert([
        {
          name: 'Hoppathon',
          brand: 'Brew Hop',
          price: 5,
          alcoholContent: 5.5,
          type: 'IPA',
          fill: 124
        },
        {
          name: 'Green Flash',
          brand: 'Brew Hop',
          price: 6,
          alcoholContent: 5.5,
          type: 'IPA',
          fill: 124
        },
        {
          name: 'Calm Bucha',
          brand: 'Bucha Brothers',
          price: 4,
          alcoholContent: 0.5,
          type: 'Kombucha',
          fill: 124
        },
        {
          name: 'Dark Soul',
          brand: 'West Coast Malt',
          price: 6,
          alcoholContent: 7.5,
          type: 'Stout',
          fill: 60
        }
      ]);
    });
};
