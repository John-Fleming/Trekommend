import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import './Login.scss';

class Login extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    // const provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider);
    console.error('logging in');
  }

  render() {
    return (
      <div className="Login mx-auto">
        {/* <div className="logo d-flex justify-content-center">
          <img src="https://i.imgur.com/SK3um5y.png" alt=""/>
        </div> */}
        <h1 className="app-title text-center">Trekommend</h1>
        <div id="login-btn" className="d-flex justify-content-center">
          <button className="btn btn-outline-dark btn-lg mt-3" onClick={this.loginClickEvent}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
