/**
 * Created by ray.xie on 9/30/2016.
 */

// Dream starts here

import express from 'express';
import path from 'path';
import exphab from 'express-handlebars';
import bodyParser from 'body-parser';
import db from './database/database';


const app = express();
const port = 3000;

app.engine('.hbs', exphab({
  defaultLayour: 'main',
  extname: '.hbs',
  layoutDir: path.join(__dirname, 'views/layouts'),
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

const logRequestHeaderMiddleware = (req, rsp, next) => {
  console.log(req.url);
  next();
};

const testMiddleware = (req, rsp, next) => {
  req.chance = Math.random();
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logRequestHeaderMiddleware);
app.use(testMiddleware);


const User = db.import('./database/models/users');

app.get('/users', (req, rsp) => {
  User.findOne({ order: [['id', 'DESC']] }).then((user) => {
    if (user) {
      rsp.render('home', {
        name: user.get('name'),
      });
    } else {
      rsp.send('No users are available');
    }
  });
});

app.post('/user', (req, res) => {
  const user = req.body;

  User.create({
    name: user.name,
    age: user.age,
  }).then(() => { res.sendStatus(200); });
});

// Error handler
app.use((err, req, rsp, next) => {
  // log the error, for now just console.log
  console.log(err);
  rsp.status(500).send('Something broke!');
  next();
});


app.listen(port, (err) => {
  if (err) {
    return console.log(`something went wrong:${err}`);
  }

  return console.log(`server is listening on port ${port}`);
});

