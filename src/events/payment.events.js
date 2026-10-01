import {QueueEvents} from 'bullmq';
import connection from '../config/redis.js';

const paymentQueueEvents = new QueueEvents("inventory", {
  connection,
}); 

paymentQueueEvents.on("waiting", ({ jobId }) => {
  console.log(`Payment waiting for job ${jobId}`);
}
);

paymentQueueEvents.on("active", ({ jobId }) => {
  console.log(`Payment active: ${jobId}`);
}
);

paymentQueueEvents.on("progress", ({ jobId, data }) => {
  console.log(`Payment progress: ${jobId}`, data);
}
);

paymentQueueEvents.on("completed", ({ jobId }) => {
  console.log(`Payment completed for job ${jobId}`);
}
);

paymentQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.log(`Payment failed for job ${jobId}: ${failedReason}`);
}
);

paymentQueueEvents.on("stalled", ({ jobId }) => {
  console.log(`Payment stalled for job ${jobId}`);
}
);

export default paymentQueueEvents;