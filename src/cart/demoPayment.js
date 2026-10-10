// A cancellable presentation delay only: no network request or payment service.
export function simulatePayment({ signal, delayMs = 700 } = {}) {
  return new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
      reject(new DOMException('Demo checkout cancelled.', 'AbortError'));
    };
    let timer;
    if (signal?.aborted) return abort();
    signal?.addEventListener('abort', abort, { once: true });
    timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, delayMs);
  });
}
