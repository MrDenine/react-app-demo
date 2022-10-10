import axios from 'axios'; 
import {useEffect, useState} from "react";
const useApi = (endpoint, requestType, body) =>{
    const [data, setData] = useState({
        fetchedData: [],
        isLoading:false,
        isFetchingData: false,
        isError: false
    })
    useEffect(() => {
        let axiosSource = axios.CancelToken.source() // generate a source for axios
        let didCancel = false // we can rely on this variable.
        const requestApi = async () => {
          let response = {}
          try {
            setData(data => {
              return { ...data, isFetchingData: true, isLoading:true }
            })
            console.log(endpoint)
            const axiosOptions = { cancelToken: axiosSource.token }
            switch (requestType) {
              case 'GET':
                return (response = await axios.get(endpoint, axiosOptions))
              case 'POST':
                return (response = await axios.post(endpoint, body, axiosOptions))
              case 'DELETE':
                return (response = await axios.delete(endpoint, axiosOptions))
              case 'UPDATE':
                return (response = await axios.put(endpoint, body, axiosOptions))
              case 'PATCH':
                return (response = await axios.patch(endpoint, body, axiosOptions))
              default:
                return (response = await axios.get(endpoint, axiosOptions))
            }
          } catch (e) {
            console.error(e)
            if (!didCancel) {
              setData(data => {
                return { ...data, isError: true }
              })
            }
          } finally {
            // do not update the data if the request is cancelled
            if (response.data && !didCancel) {
              setData(data => {
                return {
                  ...data,
                  isFetchingData: false,
                  isLoading: false,
                  fetchedData: response.data
                }
              })
            }
          }
        }
        requestApi()
        // Here we are saying to axios cancel all current ongoing requests
        // since this is the cleanup time.
        return () => {
          didCancel = true
          axiosSource.cancel()
        }
      }, [body, endpoint, requestType])
    return data;
}

export default useApi;