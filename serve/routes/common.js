function Err(message,code) {
    return {
        code: code || 123,//错误码
        message: message
    }
}
function Data(code,data,message) {
    return {
        code: code || 0,//错误码
        message: message || '',
        data: data || []
    }
}
module.exports = { Err, Data};
