export const swapiListResponse = <T>(data: T[]) => ({
  count: data.length,
  next: '',
  previous: '',
  results: data,
});

export const axiosMockResponse = <T>(data: T) => ({
  status: 200,
  statusText: 'ok',
  headers: {},
  config: { url: '' },
  data: data,
});
