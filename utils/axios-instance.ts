// import { BASE_URL } from '@/config';
import axios from 'axios';
import axiosRetry from 'axios-retry';
// import * as serviceWorkerRegistration from 'serviceWorkerRegistration';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: "https://emsplug.com/api",
  timeout: 60000
});
console.log("base url is ---------->", axiosInstance);

axiosRetry(axiosInstance, {
  retries: 3, // number of retries
  retryDelay: (retryCount: any) => {
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error: any) =>
    // if retry condition is not specified, by default idempotent requests are retried
    error?.response?.status === 502 ||
    error?.response?.status === 501 ||
    error?.response?.status === 500 ||
    error?.response?.status === 503
});

export default axiosInstance;
