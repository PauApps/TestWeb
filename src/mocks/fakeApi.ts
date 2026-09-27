export interface SimulateOptions {
  delayMs?: number;
  failProbability?: number; // 0 to 1
  errorMessage?: string;
}

/**
 * Simula una crida API asíncrona amb latència de xarxa i gestió d'errors opcionals.
 */
export async function simulateApiCall<T>(
  data: T,
  options: SimulateOptions = {}
): Promise<T> {
  const { delayMs = 600, failProbability = 0, errorMessage = 'Error simulat de xarxa' } = options;

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (failProbability > 0 && Math.random() < failProbability) {
    throw new Error(errorMessage);
  }

  return JSON.parse(JSON.stringify(data));
}
