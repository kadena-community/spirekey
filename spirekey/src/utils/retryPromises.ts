export async function retryPromises<T>(
  input: () => Promise<T>,
  tries = 3,
  interval = 2500,
): Promise<T> {
  for (let i = 0; i < tries; i++) {
    try {
      await new Promise((resolve) => setTimeout(resolve, interval));
      return await input();
    } catch (e) {
      console.log(`Retrying ${i}...`, e);
    }
  }

  throw new Error(`Failed after ${tries} retries`);
}
