export const setTime = async (millis) =>
  await new Promise((resolve) => setTimeout(resolve, millis));
