import {QueueEvents} from 'bullmq';
import connection from '../config/redis.js';

const inventoryQueueEvents = new QueueEvents("inventory", {
  connection,
}); 

inventoryQueueEvents.on("waiting", ({ jobId }) => {
  console.log(`Inventory waiting for job ${jobId}`);
}
);

inventoryQueueEvents.on("active", ({ jobId }) => {
  console.log(`Inventory active: ${jobId}`);
}
);

inventoryQueueEvents.on("progress", ({ jobId, data }) => {
  console.log(`Inventory progress: ${jobId}`, data);
}
);

inventoryQueueEvents.on("completed", ({ jobId }) => {
  console.log(`Inventory completed for job ${jobId}`);
}
);

inventoryQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.log(`Inventory failed for job ${jobId}: ${failedReason}`);
}
);

inventoryQueueEvents.on("stalled", ({ jobId }) => {
  console.log(`Inventory stalled for job ${jobId}`);
}
);

export default inventoryQueueEvents;