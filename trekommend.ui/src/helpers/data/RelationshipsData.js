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

const followAUser = (newFollow) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/relationships`, newFollow)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

const unfollowAUser = (userId, unfollowedUserId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/relationships/${userId}/unfollow/${unfollowedUserId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

export default {getUserFollowers, getUsersBeingFollowed, followAUser, unfollowAUser}; // eslint-disable-line
