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

const getSingleTrip = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/trips/singleTrip/${tripId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

const addNewTrip = (newTrip) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/trips`, newTrip)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

export default {getTripsByUserId, getUserTripCount, getSingleTrip, addNewTrip}; //eslint-disable-line
