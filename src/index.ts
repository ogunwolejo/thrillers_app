import * as http from 'http';
import * as https from 'https';

import express, {Application} from 'express';
import {config} from 'dotenv';
import corsMiddleware from './middlewares/cors';
import helmetMiddleware from './middlewares/helmet';
import router from './routes/route';
import {loggerMiddleware} from './middlewares/logger';

config({
  debug:true,
})
const app: Application = express();

//Middlewares
app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(express.json());
app.use(express.urlencoded({
  extended:true
}))
app.use(loggerMiddleware);

//Routes
app.use('/api/v1/finance', router);

if (process.env.NODE_ENV === 'production') {
  https.createServer(app).listen(process.env.PORT, () => {
    console.log('connecting to port .....', process.env.PORT);
  });

}

app.listen(process.env.PORT, () => {
  console.log('connecting to port .....', process.env.PORT);
});
