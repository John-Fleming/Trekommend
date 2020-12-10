import axios from 'axios';
import { baseUrl } from './constants.json';

import RecPhotoData from './RecPhotoData';

const getRecommendationsByTripId = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recommendations/trip/${tripId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

// this needs to be tested - getRecsWithPhotos
const getRecsWithPhotos = (tripId) => new Promise((resolve, reject) => {
  const recs = getRecommendationsByTripId(tripId)
    .then((resp) => resolve(resp))
    .catch((err) => console.error('could not get recommendations', err));
  console.error(recs); // this showed me the promise was still pending so need a second promise
  const recsWithPhotos = [];

  Object.keys(recs).forEach((rec) => {
    RecPhotoData.getPhotosByRecId(rec.recId)
      .then((response) => {
        const photos = response.data;
        recsWithPhotos.push({ ...rec, recPhotos: [photos] });
      })
      .catch((err) => reject(err));
  });

  return recsWithPhotos;
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

export default {getRecommendationsByTripId, getRecsWithPhotos}; // eslint-disable-line
