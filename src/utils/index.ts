/**
 *
 * @param ms - Number of milliseconds to sleep
 * @returns void - pause the program for a specified amount of time
 */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 *
 * @returns the current timestamps
 */
export const getTS = () => Number(process.hrtime.bigint() / 1000000n);
