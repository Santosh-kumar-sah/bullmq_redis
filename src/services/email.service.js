const sendEmail = async (data) => {
  console.log(
    `Sending email to ${data.email}`
  );

  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return {
    messageId: `MSG-${Date.now()}`,
    sent: true,
  };
};

export default sendEmail;