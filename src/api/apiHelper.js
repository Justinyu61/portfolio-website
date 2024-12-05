export function apiHelper(apiFunc, ...params) {
  return new Promise(async (res, rej) => {
    try {
      const response = await apiFunc(...params);
      res(response);
    } catch (error) {
      rej(error);
    }
  });
}
