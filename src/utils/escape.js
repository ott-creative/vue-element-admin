export default function escapeParam(param) {
    var key;
    for (key in param) {
        if (param.hasOwnProperty(key) && typeof param[key] == 'string') {
            param[key] = encodeURI(param[key]);
        }
    }

    return param;
}