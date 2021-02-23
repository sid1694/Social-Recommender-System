const mongoose=require('mongoose')

const db = require('../config/keys').mongoURI;

var connection=mongoose
  .connect(db, { useNewUrlParser: true }) 
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


