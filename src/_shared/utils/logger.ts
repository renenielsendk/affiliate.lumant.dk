import { customAlphabet } from 'nanoid';
import pino, { Logger } from 'pino';

export const createLogger = (name: string) => pino({ name });

// logger.ts

export let logger: Logger = pino({ name: '' });

export const initializeLogger = (name: string, trace: string) => {
  const id = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 20)();
  logger = pino({ name }).child({ requestId: id });
  logger.info({ trace: 'initializeLogger' }, `Initialized ${name} logger by ${trace}`);
};

export const initializeAPILogger = ({ name, req }: { req: Request; name: string }) => {
  const id = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 20)();
  logger = pino({ name: `${req.method}:${name}` }).child({ requestId: id });
  logger.info({ trace: 'initializeAPILogger' }, `Logger initialized at route ${req.method}:${req.url}`);
};
