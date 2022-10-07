let error = {}
error.create = (status,message)=>{
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}
export default error;
