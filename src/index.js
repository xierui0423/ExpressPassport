/**
 * Created by ray.xie on 9/30/2016.
 */

// Dream starts here

import express from 'express';
import path from 'path';
import exphab from 'express-handlebars';
import bodyParser from 'body-parser';
import pg from 'pg';

const conString = 'postgres://postgres:inter1908@localhost/pgtest';

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(logRequestHeaderMiddleware);
app.use(testMiddleware);

app.get('/users', (req, rsp, next) => {
  pg.connect(conString, (conError, client, done) => {
    if (conError) {
      return console.error('error at establishing connection', conError);
    }

    client.query('SELECT name, age FROM users', [], (dbErr, result) => {
      // this done callback signals the pg driver that the
      // connection can be closed or returned to the connection pool
      done();

      if (dbErr) {
        // pass the error to the express error handler
        return next(dbErr);
      }

      const users = result.rows;

      if (!users.length) {
        rsp.send('No users are available');
      } else {
        rsp.render('home', {
          name: users[users.length - 1].name,
        });
      }

      return undefined;
    });

    return undefined;
  });
});

app.post('/user', (req, res, next) => {
  const user = req.body;

  pg.connect(conString, (conError, client, done) => {
    if (conError) {
      return console.error('error at establishing connection', conError);
    }

    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], (dbErr) => {
      // this done callback signals the pg driver that the
      // connection can be closed or returned to the connection pool
      done();

      if (dbErr) {
        // pass the error to the express error handler
        return next(dbErr);
      }

      res.sendStatus(200);

      return undefined;
    });

    return undefined;
  });
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

