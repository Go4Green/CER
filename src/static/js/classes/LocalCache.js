import { localstorage as supportsLocalStorage } from 'modernizr';
import { errorLoggerAndErrorReturn, warnLoggerAndErrorReturn } from "../functions/errors";

export default function(prefix, default_expire_seconds) {

    var default_expire_seconds = parseInt(default_expire_seconds, 10) || 3600;

    if (!supportsLocalStorage) {
        console.warn(["Current browser does not support localStorage."]);
    }

    return !prefix ? errorLoggerAndErrorReturn(['Cache object prefix is required']) : {
        prefix: prefix,
        seconds: default_expire_seconds,
        set: function(key, value, expire_seconds, ret) {
            if (supportsLocalStorage) {
                expire_seconds = expire_seconds ? expire_seconds : default_expire_seconds;
                if (!expire_seconds) {
                    ret = warnLoggerAndErrorReturn(["Invalid cache expiration value", expire_seconds]);
                }
                try {
                    localStorage.setItem(prefix + '[' + key + ']', JSON.stringify({
                        value: value,
                        expire: new Date().getTime() + (expire_seconds * 1000)
                    }));
                    ret = !0;
                } catch (error) {
                    ret = warnLoggerAndErrorReturn([error]);
                }
            }
            return ret;
        },
        get: function(key, ret) {
            ret = supportsLocalStorage ? localStorage.getItem(prefix + '[' + key + ']') : null;
            ret = ret ? JSON.parse(ret) : null;
            ret = null !== ret ? (void 0 !== ret.expire && ret.expire > new Date().getTime() ? ret.value : null) : ret;
            return ret;
        },
        clear: function() {
            var k;
            if (supportsLocalStorage && Object.keys(localStorage).length) {
                for (k in localStorage) {
                    if (localStorage.hasOwnProperty(k)) {
                        if (0 === k.indexOf(prefix)) {
                            localStorage.removeItem(k);
                        }
                    }
                }
            }
            return !0;
        }
    };
}