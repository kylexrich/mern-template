require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/connectToDB');
const path = require('path');
const userRoutes = require("./routes/user");

start();

function start() {
  const app = express();
  const port = process.env.PORT || 3001;
  setupExpress(app);
  setupRoutes(app);
  if (process.env.NODE_ENV === 'production') serveBuild(app);
  run(app, port);
}

function setupExpress(app) {
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
}

function setupRoutes(app) {
  app.use('/api/users', userRoutes);
}

function serveBuild(app) {
  const buildPath = path.join(__dirname, '../client/build');
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(buildPath, 'index.html'));
    });
  }
}

function run(app, port) {
  connectToDB().then(() => {
    app.listen(port, () => {
      console.log(
          `CourseGPT server is running on port ${port}! URL: http://localhost:${port}/`
      );
      console.log(process.env.JWT_SECRET);
    });
  });
}
