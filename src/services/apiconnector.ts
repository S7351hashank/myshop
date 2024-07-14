import axios from "axios"

export const axiosInstance = axios.create({
    withCredentials: true // This allows credentials (cookies) to be sent with requests
});

export const apiConnector = (method: any, url: any, bodyData: any, headers:any, params: any) => {
    // console.log("url",url);
    const cookies = document.cookie;
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: {
            ...headers,
            'Access-Control-Allow-Credentials': true,
            'Cookie': cookies
        },
        params: params ? params : null,
    });
}