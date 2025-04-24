import { Configuration, DefaultApi } from '../api';

const config = new Configuration({
  basePath: 'http://localhost:8080'
});

export const api = new DefaultApi(config);