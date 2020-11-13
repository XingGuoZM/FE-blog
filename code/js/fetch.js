const abortController = new AbortController();

fetch('/api/query',{
  signal:abortController.signal
});

abortController.abort();