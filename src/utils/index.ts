/**
 * Delays the execution of the code for the specified amount of time in milliseconds.
 *
 * @param {number} ms - The number of milliseconds to delay the execution of the code.
 * @returns {Promise<void>} - A Promise that resolves after the specified delay time has passed.
 */
export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 *
 * @returns the current timestamp in milliseconds
 */
export const getTS = () => Number(process.hrtime.bigint() / 1000000n);
