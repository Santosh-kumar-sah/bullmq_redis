import Order from '../models/Order.js';

import createOrderJob from '../jobs/createOrder.job.js';

const createOrder = async (req, res, next) => {
  try {
    const {
      userId,
      email,
      items,
      forcePaymentFailure,
      forceInventoryFailure,
    } = req.body;

    if (
      !userId ||
      !email ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message:
          "userId, email and items are required",
      });
    }

    const totalAmount =
      items.reduce(
        (sum, item) =>
          sum +
          item.price *
            item.quantity,
        0
      );

    const order = await Order.create({
      userId,
      email,
      items,
      totalAmount,
      status: "PENDING",
    });

    const flow =
      await createOrderJob({
        ...order.toObject(),

        forcePaymentFailure,
        forceInventoryFailure,
      });

    res.status(201).json({
      message:
        "Order created and processing started",

      orderId: order._id,

      flowJobId:
        flow.job.id,

      status:
        "PROCESSING",
    });
  } catch (error) {
    next(error);
  }
};

export default createOrder;
