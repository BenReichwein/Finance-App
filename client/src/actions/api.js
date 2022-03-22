import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// This makes it so we can use shortened url with api calls
export default axios.create({
  baseURL: `http://localhost:8080/`,
  withCredentials: true,
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  params: {
    token: cookies.get('token')
  }
});