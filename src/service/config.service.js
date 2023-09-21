import axios from "axios";

const createApiClient = (baseURL, headers) =>{
    const commonConfig = {
        withCredentials: true,
        headers: headers ? headers : {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    return axios.create({
        baseURL,
        ...commonConfig,
    });
}
export default createApiClient