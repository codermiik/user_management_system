const express = require('express');
const exphbs = require('express-handlebars'); 
const dotenv = require('dotenv');
require('dotenv').config();
const connection= require('./dbconfig');
dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true})); // New

app.use(express.json()); 
app.use(express.static('public'));


const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

connection.connect((error) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Database connected successfully');
    }
  });


const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));