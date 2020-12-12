import axios from 'axios';
import { baseUrl } from './constants.json';

const getPhotosByRecId = (recId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rec-photos/${recId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

export default {getPhotosByRecId}; // eslint-disable-line
