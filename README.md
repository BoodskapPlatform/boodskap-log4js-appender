# Boodskap Appender (HTTP) for log4js-node

The boodskap appenders for log4js send JSON formatted log events to Boodskap Platform.

```bash
npm install boodskap-log4js-appender
```

## Configuration

* `type` - `boodskap-log4js-appender`
* `url` - `string` - API URL
* `application` - `string` (optional) - used to identify your application's logs
* `logChannel` - `string` (optional) - also used to identify your application's logs [but in a more specific way]
* `logType` - `string` (optional)
* `timeout` - `integer` (optional, defaults to 5000ms) - the timeout for the HTTP request.


