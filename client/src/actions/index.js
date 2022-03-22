import api from './api'
import Cookies from 'universal-cookie';
import {
    LOAD_PROFILE,
    GET_UID,
} from './types';
const cookies = new Cookies();
//
//-> Authentications
//
// making an account
export const register = (formValues) => () => {
  api.post('user/register', {
    username: formValues.username,
    email: formValues.email.toLowerCase(),
    password: formValues.password
  })
  .then(res => {
    alert(res.data)
    window.location.href = "/login"
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// logging into existing account
export const login = (formValues) => () => {
  api.post('user/login', {
    email: formValues.email.toLowerCase(),
    password: formValues.password
  })
  .then((res) => {
    cookies.set('token', res.data, { path: '/' });
    window.location.href = "/"
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Logging out of account
export const logout = () => async () => {
  await cookies.remove("token", {
    domain: "localhost:3000"
  });
  alert('Logged out')
  window.location.reload();
};
// Loading profile information
export const loadProfile = () => async (dispatch) => {
  const response = await api.get('user/profile',{
    params: {token: cookies.get('token')}
  })

  dispatch({ type: LOAD_PROFILE, payload: response.data});
};
// Get user info from authentication
export const getUserInfo = () => async (dispatch) => {
  const response = await api.get(`user/getUserInfo`,{
    params: {token: cookies.get('token')}
  })

  dispatch({ type: GET_UID, payload: response.data});
}