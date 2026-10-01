import {QueueEvents} from 'bullmq';
import connection from '../config/redis.js';

const emailQueueEvents = new QueueEvents(
    "email",
    {
        connection,
    }
)



emailQueueEvents.on('waiting',({job}) =>{
    console.log(`Email waiting for order ${job.data.orderId}`);
    
})

emailQueueEvents.on(
  "active",
  ({ jobId }) => {
    console.log(
      `email active: ${jobId}`
    );
  }
);

emailQueueEvents.on(
  "progress",
  ({ jobId, data }) => {
    console.log(
      `email progress: ${jobId}`,
      data
    );
  }
);

emailQueueEvents.on('completed',({job}) =>{
    console.log(`Email sent for order ${job.data.orderId}`);
    
})

emailQueueEvents.on(
  "failed",
  ({ jobId, failedReason }) => {    
        console.log(`Email failed for order ${jobId}: ${failedReason}`);
  }
);

emailQueueEvents.on(
  "stalled",
  ({ jobId }) => {
    console.log(`Email stalled for order ${jobId}`);
  }
);

export default emailQueueEvents;