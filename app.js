const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(cors())

app.listen(port, () => console.log(`Example app is listening at ${port}!`))

const knex = require (`knex`) ({
  client: 'mysql',
  connection : {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'kegs'
  }
})

app.use(bodyParser.urlencoded ({
  extended: true
}));
app.use(bodyParser.json({
  limit: "8mb",
}));

app.get('/',(req, res) => res.send('Hello TapRoom!'))

app.get('/keg', async (req, res) => {
  try {
    let keg = await knex ('keg');
    res.json(keg);
    console.log(keg);
  } catch (e) {
    console.log(e);
  }
})



app.post('/keg', async (req, res) => {
  try {
    let name = req.body.name;
    let brand = req.body.brand;
    let price = req.body.price;
    let alcoholContent = req.body.alcoholContent;
    let type = req.body.type;
    let fill = req.body.type;

    let id = await knex('keg').insert({
      "name": name,
      "brand": brand,
      "price": price,
      "alcoholContent": alcoholContent,
      "type": type,
      "fill": fill,
    })
    res.json({
      id: id[0],
      name,
      brand,
      price,
      alcoholContent,
      type,
      fill
    })
  } catch (e) {
    console.log(e);
    next (e)
  }
})

app.put('/keg/:id', async (req, res) => {
  console.log("hi");
  console.log(req);
  try {
    let name = req.body.name;
    let brand = req.body.brand;
    let price = req.body.price;
    let alcoholContent = req.body.alcoholContent;
    let type = req.body.type;
    let fill = req.body.fill;
    let id = req.params.id;
    console.log(id);

    await knex('keg').where('id', id).update({
      "name": name,
      "brand": brand,
      "price": price,
      "alcoholContent": alcoholContent,
      "type": type,
      "fill": fill
    })
    res.json ({
      name,
      brand,
      price,
      alcoholContent,
      type,
      fill,
      id
    })
  } catch (e) {
    console.log(e);
  }
})

