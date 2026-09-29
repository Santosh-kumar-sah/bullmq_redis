


const processPayment = async (data) => {
  console.log(
    `Processing payment for order ${data.orderId}`
  );

  await new Promise((resolve) =>
    setTimeout(resolve, 2000)
  );

  if (data.forcePaymentFailure) {
    throw new Error("Payment gateway failed");
  }

  return {
    transactionId: `TXN-${Date.now()}`,
    amount: data.amount,
    status: "SUCCESS",
  };
};

export default processPayment;