import axios from 'axios';
import { createApp } from 'vue';
// 请求超时时间
axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/api/v1';

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 0) {
            return Promise.resolve(response.data);
        } else {
            // 使用 app.config.globalProperties 代替 Vue.prototype
            const app = createApp({});
            app.config.globalProperties.$message.error(response.data.msg);
            return Promise.reject(response);
        }
    },
    error => {
        // 使用 app.config.globalProperties 代替 Vue.prototype
        const app = createApp({});
        app.config.globalProperties.$message.error(error.msg);
        return Promise.reject(error);
    }
);

function convert(url, options) {
    const keys = url
        .split("/")
        .filter((item) => item.startsWith(":"))
        .map((item) => item.slice(1));

    for (const key of keys) {
        if (options.params[key] !== undefined) {
            url = url.replace(`:${key}`, options.params[key]);
            delete options.params[key];
        }
    }
    return { url, options };
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} options [请求时携带的参数]
 */
export function get(url, options, pathVar) {
    const convertRes = convert(url, options);
    return new Promise((resolve, reject) => {
        axios({ method: "GET", url: convertRes.url, ...convertRes.options })
            .then((res) => {
                resolve(res.data);
            })
            .catch(reject);
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} options [请求时携带的参数]
 */
export function post(url, options) {
    const convertRes = convert(url, options);
    return new Promise((resolve, reject) => {
        axios({ method: "POST", url: convertRes.url, ...convertRes.options })
            .then((res) => {
                resolve(res.data);
            })
            .catch(reject);
    });
}
