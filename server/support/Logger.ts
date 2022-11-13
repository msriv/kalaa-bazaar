import { Logger, createLogger, transports } from 'winston';

const consoleTransport = new transports.Console();

const logger = createLogger({
  level: 'verbose',
  transports: [consoleTransport],
});

class ServerLogger {
  private static sInstance: ServerLogger;
  private readonly logger: Logger;
  private constructor() {
    this.logger = logger;
  }

  static getInstance = (): ServerLogger => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!ServerLogger.sInstance) ServerLogger.sInstance = new ServerLogger();
    return ServerLogger.sInstance;
  };

  getLogger = (): Logger => this.logger;

  info = (message: string): void => {
    this.logger.info(message);
  };

  debug = (message: string, args: Array<{ [key: string]: string }>): void => {
    this.logger.debug(message, ...args);
  };
}

export { ServerLogger };
