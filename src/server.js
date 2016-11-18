/**
 * Created by ray.xie on 9/30/2016.
 */

// Dream starts here


import rp from 'request-promise';
import db from './database/database';

const User = db.import('./database/models/users');

app.get('/users', passport.authenticate('jwt', { session: false }), (req, rsp) => {
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

app.post('/user', (req, rsp) => {
  const user = req.body;

  User.create({
    name: user.name,
    age: user.age,
  }).then(() => { rsp.sendStatus(200); });
});


app.get('/login', (req, rsp) => {
  rsp.json(jwt.sign({ foo: 'bar', key: 'keykey' }, SECRET_KEY));
});

app.get('/test', (req, rsp) => {
  rp({
    uri: 'https://blog.risingstack.com/node-hero-node-js-request-module-tutorial/',
  }).then((val) => {
    rsp.send(val);
  });
});



