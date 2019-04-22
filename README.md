# Tap Room API
#### Express / Knex / MySQL back end for tap-room-react project (api branch)
_Published_ **April 21 2019**<br>
_Author_  **Kimberly McConnell**
<hr/>

## **Set Up Guide**
_This guide will tell you how to clone down the repo and get it running with a database. It assumes you have brew installed._
***

### Clone Repo
Clone this repository and run
```bash
$ npm install
```

###  Set up MySQL on your local host

If you do not already have MySQL installed, run from anywhere on your computer:
```bash
$ brew install mysql
```
 If you want to check if you have it aready, run the following and see if mysql is in the list:
```bash
$ ls usr/local/Cellar
```

Now that we have MySQL, we need to start up the server. Run 
```bash
$ brew services start mysql
```

Unless you already have a configuration, log into the MySQL client with: 

```bash
$ mysql -u root
```
`-u` refers to the user, and `root` is the default user. 

You'll need a database for the data to go in. You can see MySQL's database list with

```bash
$ show databases;
```

Add the taproom_local database to the list by running: 
```bash
$ create database taproom_local;
```

**Knex and MySQL passwords** <br>
I have not yet found a way to run Knex without a password for the MySQL server. Knex with automatically try to send one, so if there isn't actually a password sent, the server will throw an error and fail to connect. I got around this by setting the password on my local MySQL server to 'password', which solved the problem. To do this, _in your MySQL client_, run 
```bash
$ ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```
and this will set the password of `root` to `password`. 

If you already have a password on your MySQL server that is _not_ `password`, or you have a user name that isn't `root`, instead go into the knexfile.js file and change the `user: 'root'` and/or `password: 'password'` line to reflect your login info. 

#### Knex Migration for data table
To set up a structured data table in the taproom_local database, run:
```bash
$ knex migrate:latest
```
To populate the table with seed data, run: 
```bash
$ knex seed:run
```

<br>
<br>



***
***
# **Do it Yourself Tutorial**
_This guide will tell you how to set this project up for yourself. It assumes you have brew installed._
***

### **Create a project directory**
Create and initalize a directory to hold Express

```bash
$ mkdir test-project
$ cd test-project
$ npm init
```
_This will promt you with some questions. In my project, I used app.js as the entry point, but the basic configuration is fine too._

### **Install Express**
Express is a minimalist web application framework for Node.js. It provides functionality ("middlewear") to handle and respond to http requests, define routing, and more. 

```bash
$ npm install express --save
```

### **Hello World with Express**

_This code comes from the [Express Getting Started](https://expressjs.com/en/starter/hello-world.html) guide on the Express website_

Open up your entry point file (app.js, or index.js if you went with the default) in your favorite text editor and enter the following code:
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```
We're got two different functions here, a get and a listen. <br/>
If you navigate to http://localhost:3000 in your browser, you should see the resonse of the get request, your hello world message! <br/>
In your terminal, run 
```bash
$ node app.js
```
and you'll see the response of the listen! _Note: If you used a different entry-point filename, use that here._

##  **Setting up MySQL**
MySQL is an SQL database management system. It is a relational database, so all data is structured in defined tables.

From anywhere on your computer, run:
```bash
$ brew install mysql
```
Because brew is installing MySQL in `usr/local/Cellar`. If you want to check that it's there, run the following:
```bash
$ ls usr/local/Cellar
```

Great! Now that we have MySQL, we need to start up the server. Run 
```bash
$ brew services start mysql
```

Now we can log into the MySQL client with: 

```bash
$ mysql -u root
```
`-u` refers to the user, and `root` is the default user. There is no initial password, but if we wanted to enter a password as well, we'd add a `-p` to the command. We'll get to that in a bit.

Now we're going to need a database for our data to go in. MySQL's configurations are in their own databases already, and we can cehck out the list with 
```bash
$ show databases;
```
MySQL should show us a list that looks like

**Databases** <br>
information_schema <br>
mysql <br>
performance_schema <br>
sys 


We'll add another database to this list, then we'll let Knex take over from there. To add another database, run: 
```bash
$ create database taproom_local;
```
I'm going to name the database `taproom_local`. You can pick a name that descibes the data you want to store. 

Run `show databases;` again and you should see your new database in the list! 

_Note: Coming from Javascript, you may be tempted to leave off the semi-colon in the mysql commands. However, they are very important here! MySQL won't execute your command until it sees one._

If you want to exit the client, simply run 
```bash
$ exit
```
though I have found it helpful to have the client running in another terminal tab or window when working with it. 

## **Install Knex**
Knex is a SQL query builder for Node.js that allows for model schema creation, migrations, connection pooling, and seeding. In this case, it's serving a similar purpose as an ORM library, without being a full-fledged ORM.<br>
Make sure you are back in your top-level directory of your express project (if you ever left it). We'll want to install Knex globally as well as in our dependencies.
```bash
$ npm install knex -g
$ npm install knex --save
```
Knex will need access to the npm dependency of whatever database sercive is being used, in this case MySQL. So we'll also run:
```bash
$ npm install mysql --save
```
We'll also need some configurations for Knex. In your app.js file, add the following code:

```javascript
const knex = require (`knex`) ({
  client: 'mysql',
  connection : {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'taproom_local'
  }
})
```

You'll also need a file for configuration. To generate the necessary file, run
```bash
$ knex init
```
You should now have a knexfile.js in your directory. Open this up and take a look. We'll need to alter our configurations a bit to work with our environment. Knex had automatically added development, staging and production modules. We only care about development for your small project, but you should probably go ahead and change the others to match dev configurations. 

````javascript
 development: {
      client: 'mysql',
      connection: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'taproom_local',
        charset: 'utf8'
      }
    },
````

A few things to note here:<br>
- We've made sure the client is mysql, since that was the npm package we installed (if you used the mysql2 package, enter that here instead). 
- Our host is localhost, since we have a locally-hosted MySQL server.
- We're using the default username `root`
- We're specified the database we're using.
- We're specified the password as `'password'`. More on this below.

**Knex and MySQL passwords** <br>
I have not yet found a way to run Knex without a password for the MySQL server. Knex with automatically try to send one, so if there isn't actually a password sent, the server will throw an error and fail to connect. I got around this by setting the password on my local MySQL server to 'password', which solved the problem. To do this, _in your MySQL client_, run 
```bash
$ ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```
and this will set the password of `root` to `password`. 
<br>
<br>


### **Making a table with Knex Migrations**
Migrations are bits of code you write in Knex that tell the database to do something with its structure. They come in pairs, with an up and a down function, so you can easily rollback your migrations. The Knex CLI allows you to easiy create new migrations. I'm going to name my migration new_table

```bash
$ knex migrate:make keg_table
```
Knex should have added a migrations folder to your directory with a migration file inside. The long number is the version of the migration which is followed by the name you gave it. Inside the file is the structure of an up and a down exports function. 
We'll define the structure of our table here. 

```javascript
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(`keg`, function(table){
      table.increments('id');
      table.string('name').notNullable();
      table.string('brand');
      table.integer('price');
      table.decimal('alcoholContent');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable(`keg`)
  ])
};
```

We're making a table called `keg` with 5 columns. It will have a primary key that auto-increments called `id`, as well as a name and brand that will be string, and a price and alcohol content that are numbers, with the later a decimal. We're requiring a name with `.notNullable()`, while all other categories are allowed to be NULL. <br>
The down function drops the table from the database.

```bash
$ knex migrate:latest
```

