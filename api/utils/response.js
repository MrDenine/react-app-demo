let response = {};

/**
 * @param {success} success - The boolean [true or false].
 * @param {data} data - The object of data.
 * @param {message} message - The string of message or null message.
 */

response.create = (success,data,message) =>{
    return {"success":success || false,"data":data || [],"message":message || null};
}

export default response;