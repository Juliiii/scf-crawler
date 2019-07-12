"use strict";
import Task from "./src/task";
import redis from "./src/redis";
import config from "./src/config";

exports.main_handler = async (event, context, callback) => {
  try {
    await redis.init();

    const tasks = config.task.map(o => new Task(o));

    for (const task of tasks) {
      await task.run();
    }
  } catch (err) {
    console.log(err);
  }

  return;
};
