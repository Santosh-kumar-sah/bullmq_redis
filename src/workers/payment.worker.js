import {Worker} from 'bullmq';
import connection from '../config/redis.js';

import {processPayment} from '../services/payment.service.js';

const paymentWorker = new Worker(
    'payment',
    async(job)=>{
        console.log(`Processing payment for order ${job.data.orderId}`);    
        await job.updateProgress(50);
        const result = await processPayment(job.data);
        await job.updateProgress(100);
        return result;
    },
    {
        connection,
        concurrency: 10,
    }
    
)   

paymentWorker.on('completed',async(job,result)=>{
    console.log(`Payment processed for order ${job.data.orderId} with status ${result.status}`);
})

paymentWorker.on(
  "failed",
  (job, error) => {
    console.error(
      "Payment processing failed:",
      error.message
    );
  }
);  

export default paymentWorker;

