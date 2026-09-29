import {Queue} from 'bullmq';

import connection from '../config/redis.js'

const emailQueue = new Queue("email", {
  connection,

  defaultJobOptions: {
    attempts: 5,

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



export default emailQueue;
