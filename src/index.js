/**
 * Created by ray.xie on 9/30/2016.
 */

// Dream starts here

import express from 'express';
import path from 'path';
import exphab from 'express-handlebars';

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

app.use(logRequestHeaderMiddleware);
app.use(testMiddleware);

app.get('/', (request, response) => {
  response.render('home', {
    name: 'John',
  });
})

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

