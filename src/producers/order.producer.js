import createOrderFlow from "../flows/order.flow";

const createOrderJob = async (order) => {
  try {
    const flow = await createOrderFlow(order);
  } catch (error) {
    console.error("Error creating order job:", error);
  }
};

export default createOrderJob;