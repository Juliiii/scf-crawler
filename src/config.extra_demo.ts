import { PartialConfig } from "./config";

const config: PartialConfig = {
  redis: {
    host: "xxxx",
    port: 6379,
    password: "xxx"
  },
  mail: {
    from: "xx@qq.com",
    to: "xx@gamil.com",
    service: "qq",
    port: 465,
    secure: true,
    auth: {
      user: "xxx@qq.com",
      pass: "xxx"
    }
  }
};

export default config;
