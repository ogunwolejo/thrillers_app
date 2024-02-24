import helmet from 'helmet';
import { RequestHandler } from 'express';
const helmetMiddleware: RequestHandler = helmet();
export default helmetMiddleware;