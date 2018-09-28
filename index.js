const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8888;

const users = [{
    id: 1,
    username: 'admin',
    password: 'admin'
  },
  {
    id: 2,
    username: 'guest',
    password: 'guest'
  },
];

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .send('You need a username and passowrd');
    return;
  }

  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password;
  });

  if( !user ) {
    res
    .status(401)
    .send('User not found')
  }
  console.log(user);
  const access_token = jwt.sign({
    sub: user.id,
    username : user.username
  }, 'mysupersecretkey', {expiresIn:'3 hours'});

  res
  .status(200)
  .send({access_token})

})
app.get('/status', (req, res) => {
  const localTime = (new Date()).toLocaleTimeString();

  res
    .status(200)
    .send(`Server time is ${localTime}`)
});

app.get('*', (req, res) => {
  res.sendStatus(404);
})

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
})