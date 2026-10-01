import {Worker} from 'bullmq';
import connection from '../config/redis.js';

import {reserveInventory} from '../services/inventory.service.js';


const inventoryWorker = new Worker(

    'inventory',

    async(job) =>{

        console.log(`Updating inventory for order ${job.data.orderId}`);

        await job.updateProgress(50);

        const result = await reserveInventory(job.data.items);

        await job.updateProgress(100);

        return result;
    },

    {
        connection,
        concurrency: 10,
    }

    
)

inventoryWorker.on('completed',async(job,result)=>{
    console.log(`Inventory updated for order ${job.data.orderId}`); 
})

inventoryWorker.on(
  "failed",
  (job, error) => {
    console.error(
      "Inventory update failed:",
      error.message
    );
  }
);

export default inventoryWorker;