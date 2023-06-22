import Module from 'module';
import path from 'path';
import { createLogger, format, transports } from 'winston';

import { Log, LogLevel } from '../constants';

const { combine, label, printf, timestamp } = format;

export function getLabel(module: Module): string {
  const parts = module.filename.split(path.sep);
  const filename = parts.pop();
  const folder = parts.pop();
  return folder && filename ? path.join(folder, filename) : module.id;
}

export default function (module: Module) {
  return createLogger({
    format: combine(
      label({ label: getLabel(module) }),
      timestamp(),
      printf(function ({ label, level, message, timestamp }): string {
        return `[${level.toUpperCase()}][${label} @ ${timestamp}] ${message}`;
      })
    ),
    transports: [
      new transports.Console({
        level: LogLevel.DEBUG,
      }),
      new transports.File({
        filename: Log.ERROR,
        level: LogLevel.ERROR,
      }),
      new transports.File({
        filename: Log.INFO,
        level: LogLevel.INFO,
      }),
      new transports.File({
        filename: Log.VERBOSE,
        level: LogLevel.VERBOSE,
      }),
    ],
  });
}
