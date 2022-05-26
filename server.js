const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();
const methodOverride = require('method-override');
const PostRoutes = require('./routes/post-routes')
const ContactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')

const errMsg = chalk.bgKeyword('white').redBright;
const succMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');

mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log(succMsg('Connected to DB')))
  .catch((error) => console.log(errMsg(error)));


app.listen(process.env.PORT, (error) => {
  error ? console.log(errMsg(error)) : console.log(succMsg(`listening port ${process.env.PORT}`));
});

app.use(express.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.use(PostRoutes)
app.use(ContactRoutes)

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});