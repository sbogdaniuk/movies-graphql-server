import winston from 'winston'
import { name } from '../../package.json'

const { createLogger, format, transports } = winston
const { combine, timestamp, label, printf, colorize } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

export const logger = createLogger({
  format: combine(
    label({ label: name }),
    timestamp(),
    colorize(),
    myFormat,
  ),
  transports: [new transports.Console()],
})
