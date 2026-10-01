import {Woker} from 'bullmq';
import connection from '../config/redis.js';

import {processOrder} from '../services/order.service.js';

const orderWorker = new Worker(
    'order',
    async(job)=>{
        console.log(`Processing order ${job.data.orderId}`);

        await job.updateProgress(50);   
        
        const result = await processOrder(job.data);

        await job.updateProgress(100);
        return result;
    },
    {
        connection,
        concurrency: 10,
    }
)

orderWorker.on('completed',async(job,result)=>{
    console.log(`Order ${job.data.orderId} processed successfully with status ${result.status}`);
})

orderWorker.on(
  "failed",
  (job, error) => {
    console.error(
      "Order processing failed:",
      error.message
    );
  }
);

export default orderWorker;