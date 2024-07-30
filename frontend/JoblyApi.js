import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static token;

  static async request(endpoint, params= {}, verb = 'get') {
    console.debug('API Call:', endpoint, params, verb);

    let _token = JoblyApi.token;

    const headers = { Authorization: `Bearer ${_token}` }; 
    const url = `${BASE_URL}${endpoint}`;
    const method = verb.toLowerCase();

    let data;
    try {
      if (method === 'get') {
        data = (await axios.get(url, { params: { _token, ...params } })).data;
      } else if (method === 'post') {
        data = (await axios.post(url, { _token, ...params })).data;
      } else if (method === 'patch') {
        data = (await axios.patch(url, { _token, ...params })).data;
      } else if (method === 'delete') {
        data = (await axios.delete(url, { params: { _token, ...params } })).data;
      }

      return data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async login(data) {
    let res = await this.request('auth/token', data, 'post');
    return res.token;
  }

  static async signup(data) {
    let res = await this.request('auth/register', data, 'post');
    return res.token;
  }

  static async getCurrentUser() {
    let res = await this.request('users/me');
    return res.user;
  }

  static async getCompanies(name) {
    let res = await this.request('companies', { name });
    return res.companies;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJobs(title) {
    let res = await this.request('jobs', { title });
    return res.jobs;
  }
}

export default JoblyApi;