"use strict";
const { main_handler } = require("./dist/index");
exports.main_handler = async function(event, context, callback) {
  return await main_handler(event, context, callback);
};
