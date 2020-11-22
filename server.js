const express = require('express');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const User = require('./models/User');
const db = require('./db');

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

const sendResponses = (res, data, err) => {
  if (err) {
    res.json({ success: false, message: err });
  } else if (!data) {
    res.json({ success: false, message: 'Not Found' });
  } else {
    res.json({ success: true, data: data });
  }
};

// CREATE
app.post('/users', (req, res) => {
  // User.create()
  User.create(
    {
      ...req.body.newData,
    },
    (err, data) => sendResponses(res, err, data)
  );
});

app
  .route('/users/:id')
  // READ
  .get((req, res) => {
    // User.findById()
    User.findById(req.params.id, (err, data) => sendResponses(res, err, data));
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
    User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body.newData,
      },
      {
        new: true,
      },
      (data, err) => sendResponses(res, err, data)
    );
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
    User.findByIdAndDelete(req.params.id, (err, data) =>
      sendResponses(res, err, data)
    );
  });
