import{ error as errorLogger, warn as warnLogger } from './logger.js';

function logAndReturnError(logFn, msgArr, ErrorConstructor) {
    let err;
    switch(ErrorConstructor){
    	case TypeError:
    	case RangeError:
    	case SyntaxError:
    	case ReferenceError:
    		err = new ErrorConstructor(msgArr[0]);
    		break;
    	default:
    		err = new Error(msgArr[0]);
    }
    logFn(err.message, ...msgArr.slice(1));
    return err;
}

export function errorLoggerAndErrorReturn(msgArr, ErrorConstructor) {
    return logAndReturnError(errorLogger, msgArr, ErrorConstructor);
}

export function warnLoggerAndErrorReturn(msgArr, ErrorConstructor) {
    return logAndReturnError(warnLogger, msgArr, ErrorConstructor);
}
