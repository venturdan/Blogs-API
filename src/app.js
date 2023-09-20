const express = require('express');
const { userRoutes, categoriesRoutes, postRoutes } = require('./routes');
// ...

const app = express();

app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', userRoutes);
app.use('/', categoriesRoutes);
app.use('/', postRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;