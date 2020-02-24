'use strict';
const util = require('util');
const axios = require('axios');

function wrapErrorsWithInspect(items) {
  return items.map((item) => {
    if ((item instanceof Error) && item.stack) {
      return {
        inspect: function () {
          return `${util.format(item)}\n${item.stack}`;
        }
      };
    }

    return item;
  });
}

function format(logData) {
  return util.format.apply(util, wrapErrorsWithInspect(logData));
}

function logstashHTTPAppender(config) {
  const sender = axios.create({
    baseURL: config.url,
    timeout: config.timeout || 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return function log(event) {

      const logEvent = {
          message: format(event.data),
          context: event.context,
          level: event.level.level,
          level_name: event.level.levelStr,
          channel: config.logChannel,
          app_id: config.application,
          datetime: (new Date(event.startTime)).toISOString(),
          pid: event.pid,
          category_name: event.categoryName,
          extra: {},
      };



      // send to server
    sender.post('', logEvent)
      .catch((error) => {
        if (error.response) {
          console.error(`Boodskap Appender error posting to ${config.url}: ${error.response.status} - ${error.response.data}`);
          return;
        }
        console.error(`Boodskap Appender error: ${error.message}`);
      });
  };
}

function configure(config) {
  return logstashHTTPAppender(config);
}

module.exports.configure = configure;
