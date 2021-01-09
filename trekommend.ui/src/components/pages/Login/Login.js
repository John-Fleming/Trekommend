import React from 'react';
import './Login.scss';

import AuthData from '../../../helpers/data/AuthData';

class Login extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    AuthData.loginUser()
      .then(() => this.props.history.push('/'))
      .catch((err) => console.error('could not login user', err));
  }

  render() {
    return (
      <div className="Login mx-auto">
        <h1 className="Login-app-title text-center">Trekommend</h1>
        <div className="Login-btn d-flex justify-content-center">
          <button className="btn btn-outline-dark btn-lg mt-3" onClick={this.loginClickEvent}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
