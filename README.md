# Boodskap Appender (HTTP) for log4js-node

The boodskap appenders for log4js send JSON formatted log events to Boodskap Platform.

```bash
npm install booskap-log4js-appender
```

## Configuration

* `type` - `booskap-log4js-appender`
* `url` - `string` - API URL
* `application` - `string` (optional) - used to identify your application's logs
* `logChannel` - `string` (optional) - also used to identify your application's logs [but in a more specific way]
* `logType` - `string` (optional)
* `timeout` - `integer` (optional, defaults to 5000ms) - the timeout for the HTTP request.

This appender will also pick up Logger context values from the events, and add them as `p_` values in the logFaces event. See the example below for more details.

# Example (default config)

```javascript
log4js.configure({
  appenders: {
    boodskap: { type: 'booskap-log4js-appender', url: '{API_BASE_PATH}/push/bin/data/{DOMAIN_KEY}/{API_KEY}/NODE_LOG/NODE/1.0/{RULE_NAME}', application: 'booskap-log4js-appender', logType: 'application', logChannel: 'node' }
  },
  categories: {
    default: { appenders: [ 'boodskap' ], level: 'info' }
  }
});

const logger = log4js.getLogger();
logger.addContext('requestId', '123');
logger.info('some interesting log message');
logger.error('something has gone wrong');
```
