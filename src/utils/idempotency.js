const isAlreadyProcessed = async (key) => {
  const exists = await connection.get(key);

  return Boolean(exists);
};

const markProcessed = async (key) => {
  await connection.set(
    key,
    "1",
    "EX",
    24 * 60 * 60
  );
};

export { isAlreadyProcessed, markProcessed };