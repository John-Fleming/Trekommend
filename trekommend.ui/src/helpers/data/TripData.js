import axios from 'axios';
import { baseUrl } from './constants.json';

const getTripsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/trips/${userId}`)
    .then((response) => resolve(response.data))
    .catch((err) => reject(err));
});

const getUsersPlannedTrips = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/trips/${userId}`)
    .then((response) => {
      const userTrips = response.data;
      resolve(userTrips.filter((trip) => trip.isPlanned));
    })
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

export default {getTripsByUserId, getUsersPlannedTrips, getUserTripCount, getSingleTrip, addNewTrip}; //eslint-disable-line
