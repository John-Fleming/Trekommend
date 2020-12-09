import axios from 'axios';
import { baseUrl } from './constants.json';

const getRecommendationsByTripId = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recommendations/trip/${tripId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

export default {getRecommendationsByTripId}; // eslint-disable-line
