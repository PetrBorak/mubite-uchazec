import { ExternalServiceError } from '../errors';

interface FetchWithRetryOptions extends RequestInit {
  retries?: number;
  timeout?: number;
  skipRetryOn?: (error: Error) => boolean;
}

export async function fetchWithRetry(
  url: string,
  options: FetchWithRetryOptions = {}
): Promise<Response> {
  const { retries = 2, timeout = 10000, skipRetryOn, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    const err = error instanceof Error ? error : new Error('Unknown error');

    if (skipRetryOn && skipRetryOn(err)) {
      throw err;
    }

    if (retries > 0 && err.name !== 'AbortError') {
      return fetchWithRetry(url, { ...options, retries: retries - 1 });
    }

    if (err.name === 'AbortError') {
      throw new ExternalServiceError('Request timeout', 'External API');
    }

    throw err;
  }
}
