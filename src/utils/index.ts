/**
 *
 * @param ms - Number of milliseconds to sleep
 * @returns void - pause the program for a specified amount of time
 */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 *
 * @returns the current timestamp in milliseconds
 */
export const getTS = () => Number(process.hrtime.bigint() / 1000000n);

/**
 *
 * @param length the length of the generated string
 * @returns a random alphanumeric string of length given in parameters
 */
export const generateRandomString = (length: number) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
