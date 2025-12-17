type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private log(level: LogLevel, message: string, meta?: object) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    if (meta && Object.keys(meta).length > 0) {
      // eslint-disable-next-line no-console
      console[level === 'error' || level === 'warn' ? level : 'log'](logMessage, meta);
    } else {
      // eslint-disable-next-line no-console
      console[level === 'error' || level === 'warn' ? level : 'log'](logMessage);
    }
  }

  info(message: string, meta?: object) {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: object) {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: object) {
    this.log('error', message, meta);
  }

  debug(message: string, meta?: object) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, meta);
    }
  }
}

export const logger = new Logger();
