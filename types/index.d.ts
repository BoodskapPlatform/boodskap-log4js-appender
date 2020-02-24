export interface LogstashHTTPAppender extends Appender {
  type: 'booskap-log4js-appender';
  url: string;
  timeout ?: number; //defaults to 5000
  application ?: string;
  logChannel ?: string;
  logType ?: string;
}
