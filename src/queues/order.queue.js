import {Queue} from 'bullmq';

import connection from '../config/redis.js';

const orderQueue = new Queue('order',{
    connection,
    defaultJobOptions:{
        attempts:3,
        backoff:{
            type:'exponential',
            delay:2000,
        },

        removeOnComplete:{
            count:1000
        },
        removeOnFail:false,
    }
})





export default orderQueue;
