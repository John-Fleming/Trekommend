import React from 'react';
import { parseJSON, getYear } from 'date-fns';
import { Link } from 'react-router-dom';
// import _ from 'lodash';

import { Modal, ModalHeader, ModalBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'; //eslint-disable-line

import './UserProfile.scss';

import RecommendationCard from '../../shared/RecommendationCard/RecommendationCard';

import UserData from '../../../helpers/data/UserData';
import TripData from '../../../helpers/data/TripData';
import RecommendationData from '../../../helpers/data/RecommendationData';
import RelationshipsData from '../../../helpers/data/RelationshipsData';
import AuthData from '../../../helpers/data/AuthData';

class UserProfile extends React.Component {
  state = {
    user: {},
    userRecs: [],
    tripCount: '',
    followers: [],
    following: [],
    allUsers: [],
    followersModal: false,
    followingModal: false,
    discoverUsersModal: false,
    userActionsMenu: false,
    isAuthedUser: false,
    followedByAuthUser: null,
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

  getEveryUser = () => {
    UserData.getAllUsers()
      .then((resp) => this.setState({ allUsers: resp }))
      .catch((err) => console.error('could not get all users', err));
  }

  getTripsCount = (userId) => {
    TripData.getUserTripCount(userId)
      .then((resp) => this.setState({ tripCount: resp }))
      .catch((err) => console.error('could not get user trips', err));
  }

  getFollowers = (userId) => {
    RelationshipsData.getUserFollowers(userId)
      .then((resp) => {
        const authedUserUid = AuthData.getUid();

        const foundAuthedUser = resp.filter((u) => u.uuid === authedUserUid);

        this.setState({
          followers: resp,
          followedByAuthUser: foundAuthedUser.length > 0,
        });
      })
      .catch((err) => console.error('could not get user followers', err));
  }

  getFollowing = (userId) => {
    RelationshipsData.getUsersBeingFollowed(userId)
      .then((resp) => this.setState({ following: resp }))
      .catch((err) => console.error('could not get users being followed', err));
  }

  getUserRecentRecs = (userId) => {
    RecommendationData.getRecentRecommendationsByUserId(userId)
      .then((resp) => this.setState({ userRecs: resp }))
      .catch((err) => console.error('could not get recent user recs', err));
  }

  getAllUserData = () => {
    const { userId } = this.props.match.params;

    this.getUser(userId);
    this.getTripsCount(userId);
    this.getFollowers(userId);
    this.getFollowing(userId);
    this.getEveryUser();
    this.getUserRecentRecs(userId);
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
    this.setState({ followersModal: false, followingModal: false, discoverUsersModal: false });
  }

  toggleDiscoverUsers = () => {
    this.setState({ discoverUsersModal: !this.state.discoverUsersModal });
  }

  toggleUserActions = () => {
    this.setState({ userActionsMenu: !this.state.userActionsMenu });
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
      userRecs,
      tripCount,
      followers,
      following,
      allUsers,
      followersModal,
      followingModal,
      discoverUsersModal,
      userActionsMenu,
      isAuthedUser,
      followedByAuthUser,
    } = this.state;

    const buildUsersList = (usersList) => usersList.map((u, index) => (
      <Link to={`/profile/${u.userId}`} onClick={this.routeToUser} className="modal-user custom-link row" key={index}>
        <img className="modal-user-avatar" src={u.userPhoto} alt={`${u.firstName} ${u.lastName}`}/>
        <span className="modal-user-name">{u.firstName} {u.lastName}</span>
        <button className="modal-user-view-profile btn ml-auto"><i className="fas fa-search"></i></button>
      </Link>));

    const renderUserActions = () => (
      <Dropdown className="user-actions-btn" direction="left" isOpen={userActionsMenu} toggle={this.toggleUserActions}>
        <DropdownToggle id="dropdown-toggle-btn">
          <i className="fas fa-bars"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.toggleDiscoverUsers}>
          <i className="fas fa-user-friends"></i> Find Users
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const renderFollowButtons = () => (
      followedByAuthUser
        ? <button className="btn btn-outline-dark follow-btn">Unfollow</button>
        : <button className="btn btn-outline-dark follow-btn">Follow</button>
    );

    return (
      <div className="UserProfile">
        <div className="user-container col-md-6 col-10 offset-3">
          <h2 className="user-container-username">{user.firstName} {user.lastName}</h2>

          { isAuthedUser
            ? renderUserActions()
            : renderFollowButtons()
          }

          <br/>
          <p className="subtle-text member-since mt-2">Member since {getYear(parseJSON(user.dateJoined))}</p>

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

        <Modal className="discoverUsersModal" isOpen={discoverUsersModal} toggle={this.toggleDiscoverUsers}>
          <ModalHeader>Discover Other Users</ModalHeader>
          <ModalBody>{buildUsersList(allUsers)}</ModalBody>
        </Modal>

        <div className="user-recent-recs-container col-md-8 col-10 mx-auto my-5">
          {userRecs.map((rec, index) => <RecommendationCard key={index} rec={rec} user={user}/>)}
        </div>
      </div>
    );
  }
}

export default UserProfile;
