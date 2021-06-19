import fs from 'fs/promises';
import { LogType } from '../types';

const REQUESTS_LOG_FILE_PATH = process.env['REQUEST_LOG_FILE_PATH'];
const ERRORS_LOG_FILE_PATH = process.env['ERROR_LOG_FILE_PATH'];


const logger = (message: string, type: LogType) => {
  switch (type) {
    case LogType.REQUEST:
      fs.appendFile(REQUESTS_LOG_FILE_PATH!, `${message}\n`, 'utf8');
      console.log(message);
      break;

    case LogType.ERROR:
      fs.appendFile(ERRORS_LOG_FILE_PATH!, `${message}\n`, 'utf8');
      console.log(message);
      break;

    default:
      break;
  }
};
export default logger;
