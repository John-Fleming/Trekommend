import axios from 'axios';
import { baseUrl } from './constants.json';

const getUserFollowers = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/relationships/${userId}/followers`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

const getUsersBeingFollowed = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/relationships/${userId}/following`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

export default {getUserFollowers, getUsersBeingFollowed}; // eslint-disable-line
