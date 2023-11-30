'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { timeNow } from './utils.js';
import OrderReceipt from './modules/OrderReceipt.js';

const app  = express();
const port = process.env.PORT || 12354;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.post('/orders', (request, response) => {
    const now     = timeNow();
    const order   = request.body;

    try
    {
        const receipt = new OrderReceipt(order);


        receipt.print();
    }
    catch(error)
    {
        console.log(`[${now}] [503]: POST /orders`);
        return response.status(503).json({ message: error.toString() });
    }

    // console.log(receipt);

    console.log(`[${now}] [201]: POST /orders`);

    return response.status(201).end();
});

app.listen(port, () => {
    console.log(`EscPos Server, Listening on port ${port}`);
    console.log(``);
});

