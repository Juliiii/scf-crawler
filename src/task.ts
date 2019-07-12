import redis from "./redis";
import axios from "axios";
import cheerio from "cheerio";
import { Task as TaskOptions } from "./config";
import mailer from "./mailer";

export default class Task {
  options: TaskOptions;

  constructor(options: TaskOptions) {
    this.options = options;
  }

  async run(...args) {
    if (this.customRun && typeof this.customRun === "function") {
      await this.customRun(...args);
      return;
    }

    const { name, type, url, selector } = this.options;

    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html as any);

    const value = $(selector).text();

    const oldValue = await redis.client.getAsync(name);

    if (value !== oldValue) {
      await mailer.send(name, type, value);
      await redis.client.setAsync(name, value);
    }
  }

  // 留给子类扩展
  customRun: any;
}
