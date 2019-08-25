const express = require('express');
const react = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./theme');

const Loadable = require('react-loadable');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="ch">
      <head>...</head>
      <body>
        <div id="app">${ReactDOMServer.renderToString(<App/>)}</div>
        <script src="/dist/main.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Running on http://localhost:3000/');
});
