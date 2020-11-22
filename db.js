const mongoose = require('mongoose');

const url = `mongodb+srv://numan_1:numan@gitlab-db.zaqum.mongodb.net/gitlab-db?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlPaser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log('Connected to database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

mongoose.set('useFindAndModify', false);

module.exports = 'db';
