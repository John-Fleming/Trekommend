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
    isAuthedUser: false,
  }

  getUser = (userId) => {
    UserData.getUserByUserId(userId)
      .then((resp) => {
        this.setState({ user: resp });
        const authedUserUid = AuthData.getUid();

        if (resp.uuid === authedUserUid) {
          this.setState({ isAuthedUser: true });
        } else {
          this.setState({ isAuthedUser: false });
        }
      })
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
      isAuthedUser,
    } = this.state;
    // to do: add recent activity feed component below user stats (render followers activity on authed user profile or user being viewed recent activity if on their profile)
    const buildUsersList = (usersList) => usersList.map((u, index) => (
      <Link to={`/profile/${u.userId}`} onClick={this.routeToUser} className="modal-user custom-link row" key={index}>
        <img className="modal-user-avatar" src={u.userPhoto} alt={`${u.firstName} ${u.lastName}`}/>
        <span className="modal-user-name">{u.firstName} {u.lastName}</span>
        <button className="modal-user-view-profile btn ml-auto"><i className="fas fa-search"></i></button>
      </Link>));

    return (
      <div className="UserProfile ">
        <div className="user-container col-md-6 col-10 offset-3">
          <h2 className="user-container-username">{user.firstName} {user.lastName}</h2>

          { isAuthedUser
            ? <button className="btn logout-btn ml-auto" onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i></button>
            : ''
          }

          <p className="subtle-text mt-2">Member since {getYear(parseJSON(user.dateJoined))}</p>

          <div className="row mt-4">
            <div className="user-container-avatar-container col-4">
              <img className="user-avatar" src={user.userPhoto} alt={`${user.firstName} ${user.lastName}`}/>
            </div>

            <div className="user-stats-container col-8">
              <h4 className="mx-auto">
                <span className="stat-container"><Link to={`/trips/${user.userId}`} className="custom-link btn user-stats-container-btns">{tripCount} Trips</Link></span>
                <span className="stat-container"><button onClick={this.toggleFollowers} className="btn user-stats-container-btns">{followers.length} Followers</button></span>
                <span className="stat-container"><button onClick={this.toggleFollowing} className="btn user-stats-container-btns">{following.length} Following</button></span>
              </h4>
            </div>
          </div>
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
