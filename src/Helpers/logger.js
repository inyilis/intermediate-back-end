const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  format: format.combine(format.timestamp(), format.simple(), format.printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`)),
  transports: [
    new transports.File({
      filename: 'info.log',
      level: 'info',
      handleExceptions: true,
    }),

    new transports.Console({
      level: 'debug',
    }),
  ],
});

module.exports = logger;
