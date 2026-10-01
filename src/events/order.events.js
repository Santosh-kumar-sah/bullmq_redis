import {QueueEvents} from 'bullmq';
import connection from '../config/redis.js';

const orderQueueEvents = new QueueEvents("inventory", {
  connection,
}); 

orderQueueEvents.on("waiting", ({ jobId }) => {
  console.log(`Order waiting for job ${jobId}`);
}
);

orderQueueEvents.on("active", ({ jobId }) => {
  console.log(`Order active: ${jobId}`);
}
);

orderQueueEvents.on("progress", ({ jobId, data }) => {
  console.log(`Order progress: ${jobId}`, data);
}
);

orderQueueEvents.on("completed", ({ jobId }) => {
  console.log(`Order completed for job ${jobId}`);
}
);

orderQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.log(`Order failed for job ${jobId}: ${failedReason}`);
}
);

orderQueueEvents.on("stalled", ({ jobId }) => {
  console.log(`Order stalled for job ${jobId}`);
}
);

export default orderQueueEvents;