import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
export default class Request {

  static async fetch(url, jsonData = {}, method = 'get', responseType) {
    let baseUrl;
    const host = window.location.origin || 'http://localhost';

    if (/^\/api/.test(url)) {
      baseUrl = isProd ? '' : `${host}`;
    } else if (/^\/wx/.test(url)) {
      baseUrl = `${host}`;
    }

    let config = {
      baseURL: baseUrl,
      method: method,
      timeout: 15000,
    };
    config = Object.assign(config, responseType); //设置返回的数据类型
    if (method === 'get') {
      config = {params: jsonData, ...config};
    } else {
      config = {data: jsonData, ...config}
    }
    return axios(url, config)
      .then(response => {
        return response;
      })
      .catch(error => {
        return {
          status: 500,
          statusText: error.message || "network error",
          data: {status: 500, msg: error.message || "network error"},
        }
      });
  }
}