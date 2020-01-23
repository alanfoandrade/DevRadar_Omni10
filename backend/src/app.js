import express from 'express';
import cors from 'cors';
import http from 'http';

import routes from './routes';
import { setupWebsocket } from './websocket';

import './database';

class App {
  constructor() {
    this.express = express();
    this.server = http.Server(this.express);

    this.io = setupWebsocket(this.server);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use((req, _, next) => {
      req.io = this.io;

      return next();
    });
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().server;
