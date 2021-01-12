import axios from 'axios';
import { baseUrl } from './constants.json';

const getUserByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

export default { getUserByUserId, getAllUsers }; //eslint-disable-line
