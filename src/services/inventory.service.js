const reserveInventory = async (data) => {
  console.log(
    `Reserving inventory for ${data.orderId}`
  );

  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );

  if (data.forceInventoryFailure) {
    throw new Error("Inventory unavailable");
  }

  return {
    reservationId: `RES-${Date.now()}`,
    status: "RESERVED",
  };
};

export default reserveInventory;