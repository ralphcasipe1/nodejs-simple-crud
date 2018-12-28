const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const { index } = require('./routes/index');
const { create, store, edit, update, destroy } = require('./routes/contact');
const app = express();

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'supersun',
  database: 'contact_management'
});

database.connect(error => {
  if (error) throw error;

  console.log('Connected to database!');
});

global.database = database;

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
// app.use(mogan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));

// routes
// app.use('/', contactRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index);
app.get('/add', create);
app.get('/edit/:contact_id', edit);
app.get('/delete/:contact_id', destroy);
app.post('/add', store);
app.post('/edit/:contact_id', update);

// starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on the port: ${app.get('port')}`);
})
