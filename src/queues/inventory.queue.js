import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

const inventoryQueue = new Queue("inventory", {
	connection,

	defaultJobOptions: {
		attempts: 3,

		backoff: {
			type: "exponential",
			delay: 1000,
		},

		removeOnComplete: {
			count: 100,
		},

		removeOnFail: false,
	},
});

export default inventoryQueue;
