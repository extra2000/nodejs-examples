const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const customers = [
  {
    id: 5,
    first_name: 'Gordon',
    last_name: 'Freeman'
  },
  {
    id: 6,
    first_name: 'Nick',
    last_name: 'Mendoza'
  }
];

const clients = [
  {
    id: 1,
    first_name: 'Heather',
    last_name: 'Mason'
  },
  {
    id: 2,
    first_name: 'James',
    last_name: 'Sunderland'
  }
];

app.use(bodyParser.json());

app.get('/api/v1/customers', (req, res) => {
  res.json(customers);
});

app.get('/api/v1/customers/:id', (req, res) => {
  res.json(customers[req.params.id]);
});

app.get('/api/v1/clients', (req, res) => {
  res.json(clients);
});

app.get('/api/v1/clients/:id', (req, res) => {
  res.json(clients[req.params.id]);
});

app.listen(8000, () => {
  console.log(`Server started!`);
});
