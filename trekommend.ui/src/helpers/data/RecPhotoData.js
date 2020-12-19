import axios from 'axios';
import { baseUrl } from './constants.json';

const getPhotosByRecId = (recId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rec-photos/${recId}`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

const addRecPhoto = (newPhoto) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/rec-photos`, newPhoto)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

export default {getPhotosByRecId, addRecPhoto}; // eslint-disable-line
