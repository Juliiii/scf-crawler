"use strict";
import Task from "./task";
import redis from "./redis";
import config from "./config";

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
