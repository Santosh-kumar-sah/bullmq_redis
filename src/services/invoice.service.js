const generateInvoice = async (data) => {
  console.log(
    `Generating invoice for ${data.orderId}`
  );

  await new Promise((resolve) =>
    setTimeout(resolve, 2000)
  );

  return {
    invoiceId: `INV-${Date.now()}`,
    amount: data.amount,
  };
};

export default generateInvoice;