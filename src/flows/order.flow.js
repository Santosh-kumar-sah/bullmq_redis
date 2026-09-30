import { FlowProducer } from "bullmq";

import connection from "../config/redis.js";

const flowProducer = new FlowProducer({
    connection,

})


const createOrderFlow = async(order)=>{

    const flow = await flowProducer.add({

        name:"order-flow",
        queueName:"order",

        data:{
            orderId: order._id.toString(),
            email: order.email,
            amount: order.totalAmount,
        },

        children:[

            {

            name:"process-payment",
            queueName:"payment",
            data:{

                orderId: order._id.toString(),
                amount: order.totalAmount,
                forcePaymentFailure: order.forcePaymentFailure || false,
            },
             opts: {
          attempts: 3,

          backoff: {
            type: "exponential",
            delay: 2000,
          },

          failParentOnFailure: true,
        },

        },

        {
             name: "reserve-inventory",
        queueName: "inventory",

        data: {
          orderId: order._id.toString(),
          items: order.items,
        },

        opts: {
          attempts: 3,

          backoff: {
            type: "exponential",
            delay: 1000,
          },

          failParentOnFailure: true,
        },
        },
        ]
    })

    return flow;
}

export default createOrderFlow;