import React from 'react';
import { parseJSON, getYear } from 'date-fns';
import { Link } from 'react-router-dom';
import './UserProfile.scss';

import UserData from '../../../helpers/data/UserData';
import TripData from '../../../helpers/data/TripData';
import RelationshipsData from '../../../helpers/data/RelationshipsData';

class UserProfile extends React.Component {
  state = {
    user: {},
    tripCount: '',
    followers: [],
    following: [],
  }

  getUser = () => {
    const userId = 1; // will reset this to use authed user later
    UserData.getUserByUserId(userId)
      .then((resp) => this.setState({ user: resp }))
      .catch((err) => console.error('could not get user object', err));
  }

  getTripsCount = () => {
    const userId = 1; // will reset this to use authed user later
    TripData.getUserTripCount(userId)
      .then((resp) => this.setState({ tripCount: resp }))
      .catch((err) => console.error('could not get user trips', err));
  }

  getFollowers = () => {
    const userId = 1;
    RelationshipsData.getUserFollowers(userId)
      .then((resp) => this.setState({ followers: resp }))
      .catch((err) => console.error('could not get user followers', err));
  }

  getFollowing = () => {
    const userId = 1;
    RelationshipsData.getUsersBeingFollowed(userId)
      .then((resp) => this.setState({ following: resp }))
      .catch((err) => console.error('could not get users being followed', err));
  }

  componentDidMount() {
    this.getUser();
    this.getTripsCount();
    this.getFollowers();
    this.getFollowing();
  }

  render() {
    const {
      user,
      tripCount,
      followers,
      following,
    } = this.state;
    // to do: add recent activity feed component below user stats (render followers activity on authed user profile or user being viewed recent activity if on their profile)
    return (
      <div className="UserProfile row">
        <div className="user-container col">
          <h2>{user.firstName} {user.lastName}</h2>
          <p className="subtle-text">Member since {getYear(parseJSON(user.dateJoined))}</p>
        </div>
        <div className="user-stats-container col">
          <h4>
            <span><Link to={`/trips/${user.userId}`}>{tripCount}</Link> Trips</span>
            <span className="ml-4">{followers.length} Followers</span>
            <span className="ml-4">{following.length} Following</span>
          </h4>
        </div>
      </div>
    );
  }
}

export default UserProfile;
