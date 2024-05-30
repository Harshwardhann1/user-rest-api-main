import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

 
import routes from './routes/index';

const app = express();

const cors = require('cors')
app.use(cors());
app.use(express.json());



createConnection()
  .then(() => {
    app.use('/api', routes);
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((error) => console.log(error));
