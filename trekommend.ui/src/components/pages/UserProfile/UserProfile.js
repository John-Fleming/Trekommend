import React from 'react';
import { parseJSON, getYear } from 'date-fns';
import { Link } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import './UserProfile.scss';

import UserData from '../../../helpers/data/UserData';
import TripData from '../../../helpers/data/TripData';
import RelationshipsData from '../../../helpers/data/RelationshipsData';
import AuthData from '../../../helpers/data/AuthData';

class UserProfile extends React.Component {
  state = {
    user: {},
    tripCount: '',
    followers: [],
    following: [],
    followersModal: false,
    followingModal: false,
  }

  getUser = (userId) => {
    UserData.getUserByUserId(userId)
      .then((resp) => this.setState({ user: resp }))
      .catch((err) => console.error('could not get user object', err));
  }

  getTripsCount = (userId) => {
    TripData.getUserTripCount(userId)
      .then((resp) => this.setState({ tripCount: resp }))
      .catch((err) => console.error('could not get user trips', err));
  }

  getFollowers = (userId) => {
    RelationshipsData.getUserFollowers(userId)
      .then((resp) => this.setState({ followers: resp }))
      .catch((err) => console.error('could not get user followers', err));
  }

  getFollowing = (userId) => {
    RelationshipsData.getUsersBeingFollowed(userId)
      .then((resp) => this.setState({ following: resp }))
      .catch((err) => console.error('could not get users being followed', err));
  }

  getAllUserData = () => {
    const { userId } = this.props.match.params;
    this.getUser(userId);
    this.getTripsCount(userId);
    this.getFollowers(userId);
    this.getFollowing(userId);
  }

  componentDidMount() {
    this.getAllUserData();
  }

  toggleFollowers = () => {
    this.setState({ followersModal: !this.state.followersModal });
  }

  toggleFollowing = () => {
    this.setState({ followingModal: !this.state.followingModal });
  }

  routeToUser = () => {
    this.setState({ followersModal: false, followingModal: false });
  }

  handleLogout = (e) => {
    e.preventDefault();
    AuthData.logoutUser()
      .then(() => this.props.history.push('/login'))
      .catch((err) => console.error('there was a problem logging out', err));
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props.match.params;
    const prevUserId = prevProps.match.params.userId;
    if (prevUserId !== userId) {
      this.getAllUserData(userId);
    }
  }

  render() {
    const {
      user,
      tripCount,
      followers,
      following,
      followersModal,
      followingModal,
    } = this.state;
    // to do: add recent activity feed component below user stats (render followers activity on authed user profile or user being viewed recent activity if on their profile)
    const buildUsersList = (usersList) => usersList.map((u, index) => (
      <Link to={`/profile/${u.userId}`} onClick={this.routeToUser} className="modal-user custom-link row" key={index}>
        <img className="modal-user-avatar" src={u.userPhoto} alt={`${u.firstName} ${u.lastName}`}/>
        <span className="modal-user-name">{u.firstName} {u.lastName}</span>
        <button className="modal-user-view-profile btn ml-auto"><i className="fas fa-search"></i></button>
      </Link>));

    return (
      <div className="UserProfile row">
        <div className="user-container col">
          <h2>{user.firstName} {user.lastName}</h2>
          <p className="subtle-text">Member since {getYear(parseJSON(user.dateJoined))}</p>
          <button className="btn" onClick={this.handleLogout}>Logout</button>
        </div>
        <div className="user-stats-container col">
          <h4>
            <span><Link to={`/trips/${user.userId}`} className="custom-link btn user-stats-container-btns">{tripCount} Trips</Link></span>
            <span><button onClick={this.toggleFollowers} className="btn user-stats-container-btns">{followers.length} Followers</button></span>
            <span><button onClick={this.toggleFollowing} className="btn user-stats-container-btns">{following.length} Following</button></span>
          </h4>
        </div>

        <Modal className="followersModal" isOpen={followersModal} toggle={this.toggleFollowers}>
          <ModalHeader>Followers</ModalHeader>
          <ModalBody>{buildUsersList(followers)}</ModalBody>
        </Modal>

        <Modal className="followingModal" isOpen={followingModal} toggle={this.toggleFollowing}>
          <ModalHeader>Following</ModalHeader>
          <ModalBody>{buildUsersList(following)}</ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UserProfile;
