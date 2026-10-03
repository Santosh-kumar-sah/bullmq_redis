import express from 'express';
import {orderRouter} from './routes/order.js';

const app = express();

app.use(express.json());
app.use('/orders', orderRouter);




export default app;
