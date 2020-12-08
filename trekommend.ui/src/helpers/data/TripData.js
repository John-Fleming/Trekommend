import axios from 'axios';
import { baseUrl } from './constants.json';

const getTripsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/trips/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getUserTripCount = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/trips/${userId}`)
    .then((response) => resolve(response.data.length))
    .catch((err) => reject(err));
});

export default {getTripsByUserId, getUserTripCount}; //eslint-disable-line
