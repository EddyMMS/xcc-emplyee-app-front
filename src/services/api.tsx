import { Configuration, DefaultApi } from '../api';

var employeeApiConfig = new Configuration({
  basePath: 'http://localhost:8080',
  baseOptions: {
      headers: {}
  }
});

var apiClient = new DefaultApi(employeeApiConfig)

export const setBearerToken = (token) => {
    employeeApiConfig.baseOptions.headers["Authorization"] = "Bearer " + token
    apiClient = new DefaultApi(employeeApiConfig)
    }


export const api = () => {
        return apiClient
};