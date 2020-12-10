import axios from 'axios';
import { baseUrl } from './constants.json';

const getRecommendationsByTripId = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recommendations/trip/${tripId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

// idea

// const getRecommendationsByTripId = (tripId) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/recommendations/trip/${tripId}`)
//     .then((resp) => {
//       const recs = resp.data;
//       const recsWithPhotos = [];
//       console.error('recs', recs);

//       Object.keys(recs).forEach((rec) => {
//         RecPhotoData.getPhotosByRecId(rec.recId)
//           .then((response) => new Promise((resolve) => {
//             resolve(recsWithPhotos.push({
//               ...rec,
//               recPhotos: [response.data],
//             })))
//           })
//       });

//       resolve(recsWithPhotos);
//     })
//     .catch((err) => reject(err));
// });

export default {getRecommendationsByTripId}; // eslint-disable-line
