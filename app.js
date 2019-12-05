const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
//const bookRouter = express.Router();
const port = process.env.PORT || 3030;
const Book = require('./models/bookModels');
const bookRouter = require('./routes/bookRouter')(Book);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);


app.get('/', (req, res) => {
  res.send('Welcome to my NODEMON');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
