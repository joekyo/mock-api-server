const express = require('express');
const { uid } = require('uid');

const port = 3000;

const app = express();

app.use(express.json());

let users = [];

app.get('/api/v1/users', (req, res) => {
  res.json({ users: users });
});

app.post('/api/v1/users', (req, res) => {
  const user = { ...req.body, id: uid() };
  users.push(user);
  res.status(201).send({ status: 'created' });
});

app.put('/api/v1/user/:id', (req, res) => {
  const id = req.params.id;
  if (users.findIndex((user) => user.id === id) === -1) {
    res.status(404).send({ status: 'not found' });
    return;
  }
  const updatedUser = { ...req.body, id };
  users = users.map((user) => (user.id === id ? updatedUser : user));
  res.status(200).send({ status: 'updated' });
});

app.delete('/api/v1/user/:id', (req, res) => {
  const id = req.params.id;
  if (users.findIndex((user) => user.id === id) === -1) {
    res.status(404).send({ status: 'not found' });
    return;
  }
  users = users.filter((user) => user.id !== id);
  res.status(200).send({ status: 'deleted' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});
