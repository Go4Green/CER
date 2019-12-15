import { sessionstorage as supportsSessionStorage } from 'modernizr';
import { errorLoggerAndErrorReturn, warnLoggerAndErrorReturn } from "../functions/errors";

export default function(prefix) {

    if (!supportsSessionStorage) {
        console.warn(["Current browser does not support sessionStorage."]);
    }

    return !prefix ? errorLoggerAndErrorReturn(['Cache object prefix is required']) : {
        prefix: prefix,
        set: function(key, value, ret) {
            if (supportsSessionStorage) {
                try {
                    sessionStorage.setItem( prefix + '[' + key + ']', JSON.stringify( { value: value } ) );
                    ret = true;
                } catch (error) {
                    ret = warnLoggerAndErrorReturn([error]);
                }
            }
            return ret;
        },
        get: function(key, ret) {
            ret = supportsSessionStorage ? sessionStorage.getItem( prefix + '[' + key + ']' ) : null;
            ret = ret ? JSON.parse(ret) : null;
            ret = ret ? ret.value : ret;
            return ret;
        },
        clear: function() {
            var k;
            if (supportsSessionStorage && Object.keys(sessionStorage).length) {
                for (k in sessionStorage) {
                    if (sessionStorage.hasOwnProperty(k)) {
                        if (0 === k.indexOf(prefix)) {
                            sessionStorage.removeItem(k);
                        }
                    }
                }
            }
            return true;
        }
    };
}