import React from 'react';

import UserData from '../../../helpers/data/UserData';

import './UserProfile.scss';

class UserProfile extends React.Component {
  state = {
    user: {},
  }

  getUser = () => {
    const userId = 1; // will reset this to use authed user later
    UserData.getUserByUserId(userId)
      .then((resp) => this.setState({ user: resp }))
      .catch((err) => console.error('could not get user object', err));
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { user } = this.state;

    return (
      <div className="UserProfile">
        <h2>{user.firstName} {user.lastName}</h2>
      </div>
    );
  }
}

export default UserProfile;
