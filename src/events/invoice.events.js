import {QueueEvents} from 'bullmq';
import connection from '../config/redis.js';

const invoiceQueueEvents = new QueueEvents("invoice", {
  connection,
}); 

invoiceQueueEvents.on("waiting", ({ jobId }) => {
  console.log(`Invoice waiting for job ${jobId}`);
}
);

invoiceQueueEvents.on("active", ({ jobId }) => {
  console.log(`Invoice active: ${jobId}`);
}
);

invoiceQueueEvents.on("progress", ({ jobId, data }) => {
  console.log(`Invoice progress: ${jobId}`, data);
}
);

invoiceQueueEvents.on("completed", ({ jobId }) => {
  console.log(`Invoice completed for job ${jobId}`);
}
);

invoiceQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.log(`Invoice failed for job ${jobId}: ${failedReason}`);
}
);

invoiceQueueEvents.on("stalled", ({ jobId }) => {
  console.log(`Invoice stalled for job ${jobId}`);
}
);

export default invoiceQueueEvents;