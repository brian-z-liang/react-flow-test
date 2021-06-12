const express = require('express');

const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// handle requests for static files
app.use(express.static(path.resolve(__dirname, './index.html')));

// serve index.html on the route '/'
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, './index.html')));

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send("This is not the page you're looking for..."));

// configire express global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  // object.assign with defaultErr and err
  const errorObj = Object.assign(defaultErr, err);
  // console log errorObj.log
  console.log(errorObj.log);
  // send back errorObj.status and errorObj.message as JSON(.stringify)
  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

app.listen(3000); // listens on port 3000 -> http://localhost:3000/s
