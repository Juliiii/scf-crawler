import { ClientOpts } from "redis";
import merge from "merge";

let config_extra: PartialConfig = {};

try {
  config_extra = require("./config_extra").default;
} catch (err) {
  console.error("errors: you need write a file named config_extra!");
  process.exit(1);
}

export interface Config {
  redis: ClientOpts;
  task: Task[];
  mail: MailOpts;
}

export type PartialConfig = Partial<Config>;

export interface MailTransporterOpts {
  service: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface MailOpts extends MailTransporterOpts {
  from: string;
  to: string;
}

export enum TaskType {
  NOVEL = "小说",
  ANIME = "动画",
  CARTOON = "漫画"
}

export interface Task {
  name: string;
  type: TaskType;
  url: string;
  selector?: string;
}

const config: Config = {
  redis: {
    host: "xxx",
    port: 6379,
    password: "xxx"
  },
  task: [
    {
      name: "元尊",
      type: TaskType.NOVEL,
      url: "http://book.zongheng.com/book/685640.html",
      selector: "#lastupdate .last_tit"
    },
    {
      name: "剑来",
      type: TaskType.NOVEL,
      url: "http://book.zongheng.com/book/672340.html",
      selector: "#lastupdate .last_tit"
    }
  ],
  mail: {
    from: "xxxx",
    to: "xxxx",
    service: "qq",
    port: 465,
    secure: true,
    auth: {
      user: "xxx@xxx.com",
      pass: "xxx"
    }
  }
};

export default merge.recursive(true, config, config_extra) as Config;
