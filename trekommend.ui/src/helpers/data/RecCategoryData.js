import axios from 'axios';
import { baseUrl } from './constants.json';

const getAllRecCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rec-categories`)
    .then((resp) => resolve(resp.data))
    .catch((err) => reject(err));
});

const getSingleRecCategory = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rec-categories/${categoryId}`)
    .then((resp) => resolve(resp.data.type))
    .catch((err) => reject(err));
});

export default {getAllRecCategories, getSingleRecCategory}; // eslint-disable-line
