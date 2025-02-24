export const wrapAxiosResponse = <T>(data: T) => ({
  status: 200,
  statusText: 'ok',
  headers: {},
  config: { url: '' },
  data: data,
});
