import {Worker} from 'bullmq'

import connection from '../config/redis.js';

import {generateInvoice} from '../services/invoice.service.js';

const invoiceWorker = new Worker(
    'invoice',
    async(job)=>{
        console.log(`Generating invoice for order ${job.data.orderId}`);

        await job.updateProgress(50);

        const result = await generateInvoice(job.data);

        await job.updateProgress(100);

        return result;
    },

    {
        connection,
        concurrency: 10,
    }
)

invoiceWorker.on('completed',async(job,result)=>{
    console.log(`Invoice generated for order ${job.data.orderId} with invoice ID ${result.invoiceId}`);
})

invoiceWorker.on(
  "failed",
  (job, error) => {
    console.error(
      "Invoice generation failed:",
      error.message
    );
  }
);

export default invoiceWorker;