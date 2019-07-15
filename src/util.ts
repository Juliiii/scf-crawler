import async from "async";

export const isNumber = (number: any) =>
  typeof number === "number" && !Number.isNaN(number);

interface RetryOptions {
  times: number;
  interval: number;
}

type PartialRetryOptions = Partial<RetryOptions>;

export const retry = (
  opts: PartialRetryOptions | undefined | null,
  func: any
) => {
  const _opts = Object.assign(
    { times: 3, interval: 0 } as RetryOptions,
    opts || {}
  );

  if (!isNumber(_opts.times)) {
    throw new Error("retry opts.times mush be number");
  }

  if (!isNumber(_opts.interval)) {
    throw new Error("retry opts.interval mush be number");
  }

  return new Promise((resolve, reject) =>
    async.retry(_opts, func, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  );
};
