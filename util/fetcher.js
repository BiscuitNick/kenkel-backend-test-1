export default async function fetcher(url) {
  return fetch(url) //, fetchOptions)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return {
          error: true,
          status: resp.status,
        };
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
