import config from "./config";
import redis from "redis";
import { retry } from "./util";
import { promisify } from "util";

class Redis {
  options: redis.ClientOpts;
  client: redis.RedisClient & {
    getAsync: (key: string) => Promise<string>;
    setAsync: (key: string, value: any) => Promise<any>;
  };

  constructor(options: redis.ClientOpts) {
    this.options = Object.assign({}, options);
    this.client = {} as any;
  }

  async init() {
    try {
      await retry({ times: 5, interval: 500 }, callback => {
        this.client = redis.createClient(this.options) as any;
        this.client.on("connect", () => {
          this.client.getAsync = promisify(this.client.get);
          this.client.setAsync = promisify(this.client.set);
          callback();
        });
        this.client.on("error", err => {
          callback(err);
        });
      });

      console.log("redis connected");
    } catch (err) {
      console.log("redis error");
      console.log(err);
    }
  }
}

export default new Redis(config.redis);
