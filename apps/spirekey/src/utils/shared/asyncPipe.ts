// pipe async functions
export const asyncPipe =
  (...args: Array<(arg: any) => any>): ((init: any) => Promise<any>) =>
  (init: any): Promise<any> =>
    args.reduce((chain, fn) => chain.then(fn), Promise.resolve(init));
