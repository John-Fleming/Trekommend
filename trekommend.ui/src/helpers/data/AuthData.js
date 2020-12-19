import firebase from 'firebase';
import axios from 'axios';
import { baseUrl } from './constants.json';

// interceptors work by changing the outbound request before the xhr is sent
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');

  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, (err) => Promise.reject(err));

const checkForExistingUser = (user) => new Promise((resolve, reject) => {
  const existingUser = {};
  axios.get(`${baseUrl}/users/fb/${user.firebaseUid}`)
    .then((resp) => {
      // check to make sure the resp.data adds the right uid
      existingUser.firebaseUid = resp.data.firebaseUid;
      resolve(existingUser);
    })
    .catch((err) => {
      reject(err);
      const newUser = {
        uuid: user.firebaseUid,
        firstName: user.profile.given_name,
        lastName: user.profile.family_name,
        email: user.profile.email,
        phone: null,
        userPhoto: user.profile.picture,
      };

      axios.post(`${baseUrl}/users`, newUser)
        .catch((error) => console.error('could not register new user', error));
    });
});

const loginUser = () => {
  // sub out whatever auth method firebase provides that you want to use.
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then((cred) => {
    // get token from firebase
    const userInfo = { firebaseUid: cred.user.uid, profile: cred.additionalUserInfo.profile };
    console.error('user', userInfo);
    console.error('cred', cred);
    cred.user.getIdToken()
      // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token))
      .then(() => checkForExistingUser(userInfo));
  });
};

const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUid,
  loginUser,
  logoutUser,
};
