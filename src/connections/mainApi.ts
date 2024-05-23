import axios from 'axios';

const serverBaseURL = "http://localhost:8080/api/";
const testBaseURL = "url";

export const url = serverBaseURL;

const axiosInstance = axios.create({
  baseURL: url,
});

export default axiosInstance;
