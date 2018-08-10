const express = require('express');

// Routes
const experienceRoutes = require('./routes/experience');


const app = express();

app.use('/experience', experienceRoutes);

app.listen('3000', () => {
  console.log('Listening at 3000');
});
