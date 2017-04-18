import express = require('express');
import moment = require('moment');
import sass = require('node-sass');
import path = require('path');

import Generator from './generator';

class Server {
  start() {
    this.startServer();
  }

  startServer() {
    let app = express();

    app.use(express.static('public'));

    app.get('/style.css', (req, res) => {
      let compiled = sass.renderSync({
        file: path.join(__dirname, '../styles/style.scss')
      })
      res.set('Content-Type', 'text/css');
      res.send(compiled.css);
    });

    app.get('*', (req, res) => {
      let generator = new Generator();
      let result = generator.generate(req.path);

      if (result) {
        res.send(result); 
      } else {
        res.status(404).send();
      }
    });

    app.listen(4000, () => {
      console.log('Listening on port 4000');
    });
  }
}

let server = new Server();
server.start();
