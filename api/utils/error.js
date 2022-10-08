let error = {}
/**
 * @param {status} status - The HTTP response status codes.
 * @param {message} message - The string of message or null message.
 */
error.create = (status,message)=>{
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}
export default error;
