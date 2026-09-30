import {Worker} from 'bullmq';
import connection from '../config/redis.js';

import sendEmail from '../utils/email.js';

const emailWorker = new Worker(
         'email',

    async (job) => {
        console.log(`Sending email to ${job.data.email} for order ${job.data.orderId}`);

        await job.updateProgress(50);

        const result = await sendEmail(job.data.email,job.data.orderId,job.data.amount);

        await job.updateProgress(100);

        return result;

   

      
    },

    {
        connection,
        concurrency: 10,
    }
)

emailWorker.on('completed',async(job,result)=>{
    console.log(`Email sent for order ${job.data.orderId} to ${job.data.email}`);
    
})

emailWorker.on(
  "failed",
  (job, error) => {
    console.error(
      "Email failed:",
      error.message
    );
  }
);

export default emailWorker;