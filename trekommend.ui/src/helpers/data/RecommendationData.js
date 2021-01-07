import axios from 'axios';
import { baseUrl } from './constants.json';

const getRecentRecommendationsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recommendations/${userId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

const getRecommendationsByTripId = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recommendations/trip/${tripId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

const getSingleRecommendation = (recId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recommendations/singleRec/${recId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

const addNewRec = (newRec) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/recommendations`, newRec)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

export default {getRecentRecommendationsByUserId, getRecommendationsByTripId, getSingleRecommendation, addNewRec}; // eslint-disable-line
