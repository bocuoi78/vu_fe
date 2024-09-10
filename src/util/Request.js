import axios from 'axios';

class Request {
    constructor() {
        this.baseUrl = 'http://192.168.1.125:8080/api/v1'
        const codeMessage = {
            'The server successfully returned the requested data. ': 200,
            'Create or modify data successfully. ': 201,
            'A request has been queued in the background (asynchronous task). ': 202,
            'Delete data successfully. ': 204,
            'There was an error in the request issued, and the server did not create or modify data. ': 400,
            'User does not have permission (token, username, password incorrect). ': 401,
            'The user is authorized, but access is prohibited. ': 403,
            'The request was made for a record that does not exist, and the server did not perform the operation. ': 404,
            'The requested format is not available. ': 406,
            'The requested resource has been permanently deleted and will not be available again. ': 410,
            'A validation error occurred while creating an object. ': 422,
            'A server error occurred, please check the server. ': 500,
            'Gateway error. ': 502,
            'The service is unavailable, the server is temporarily overloaded or undergoing maintenance. ': 503,
            'Gateway timeout. ': 504,
        };

        //http request 拦截器
        // axios.interceptors.request.use(
        //     config => {
        //         // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        //         config.data = JSON.stringify(config.data);
        //         config.headers = {
        //             'Content-Type': 'application/json'
        //         }
        //         // if(token){
        //         //   config.params = {'token':token}
        //         // }
        //         return config;
        //     }
        // );
        // http response 拦截器
        axios.interceptors.response.use(
            response => {
                if (response.data.errCode === 2) {
                    // router.push({
                    //     path: "/login",
                    //     querry: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
                    // })
                }
                return response;
            },
            error => {
                if (error.response.status === 404) {
                    window.location.href = '/#/404';
                }
                if (error.response.status === 401) {
                    // window.location.href = '/#/login';
                }
                // return error.response.response
                return Promise.reject({
                    status: error.response.status,
                    statusText: error.response.statusText,
                    descript: codeMessage[error.response.status] || 'Service exception',
                })
            }
        )
    }

    postWithCustomContentType(url, data = {}, contentType = 'application/json') {
        const config = {
            headers: {
                'Content-Type': contentType,
            },
        };
        return axios.post(this.baseUrl + url, data, config);
    }

    // getWithCustomResponseType(url, data = {}, contentType = 'application/json') {
    //     const config = {
    //         headers: {
    //             'Response-Type': contentType,
    //         },
    //     };
    //     return axios.get(this.baseUrl + url, data, {
    //         responseType: 'arraybuffer',
    //     });
    // }

    get(url, params = {}) {
        return axios.get(this.baseUrl + url, params);
    }

    post(url, data = {}) {
        return axios.post(this.baseUrl + url, data);
    }

    put(url, data = {}) {
        return axios.put(this.baseUrl + url, data);
    }

    delete(url) {
        return axios.delete(this.baseUrl + url);
    }
}


export default new Request();