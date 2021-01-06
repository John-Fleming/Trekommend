import React from 'react';
import './SingleTrip.scss';

import RecommendationCard from '../../shared/RecommendationCard/RecommendationCard';
import AddOrEditRecForm from '../../shared/AddOrEditRecForm/AddOrEditRecForm';

import TripData from '../../../helpers/data/TripData';
import RecommendationData from '../../../helpers/data/RecommendationData';
import UserData from '../../../helpers/data/UserData';
import AuthData from '../../../helpers/data/AuthData';

class SingleTrip extends React.Component {
  state = {
    trip: {},
    recommendations: [],
    user: {},
    recFormModal: false,
    editingRec: false,
    isAuthedUser: false,
  }

  getTrip = (tripId) => {
    TripData.getSingleTrip(tripId)
      .then((resp) => this.setState({ trip: resp }))
      .catch((err) => console.error('could not get trip', err));
  }

  getRecommendations = (tripId) => {
    RecommendationData.getRecommendationsByTripId(tripId)
      .then((resp) => this.setState({ recommendations: resp }))
      .catch((err) => console.error('could not get recommendations', err));
  }

  getUser = (userId) => {
    UserData.getUserByUserId(userId)
      .then((resp) => {
        this.setState({ user: resp });
        const authedUserUid = AuthData.getUid();

        if (resp.uuid === authedUserUid) this.setState({ isAuthedUser: true });
      })
      .catch((err) => console.error('could not get user object', err));
  }

  initializeSingleTripPageData = () => {
    const { tripId, userId } = this.props.match.params;
    this.getTrip(tripId);
    this.getRecommendations(tripId);
    this.getUser(userId);
  }

  componentDidMount() {
    this.initializeSingleTripPageData();
  }

  toggleRecFormModal = () => {
    this.setState({ recFormModal: !this.state.recFormModal });
  }

  render() {
    const {
      trip,
      recommendations,
      user,
      recFormModal,
      editingRec,
      isAuthedUser,
    } = this.state;

    const buildRecommendationCards = recommendations.map((rec, index) => <RecommendationCard key={index} rec={rec} user={user}/>);

    return (
      <div className="SingleTrip">
        <div className="jumbotron text-center">
          <h2 className="display-4 trip-name">{trip.name}</h2>
          <span className="lead">{trip.location}</span>
        </div>

        <span className="SingleTrip-header">
          {user.firstName} {user.lastName}'s Recommendations [{recommendations.length}]
        </span>

        { isAuthedUser
          ? <button className="btn" onClick={this.toggleRecFormModal}><i className="fas fa-plus"></i></button>
          : ''
        }

        <div className="SingleTrip-recommendations-container">
          {buildRecommendationCards}
        </div>

        <AddOrEditRecForm
          recFormModal={recFormModal}
          editingRec={editingRec}
          initializeSingleTripPageData={this.initializeSingleTripPageData}
          toggleRecFormModal={this.toggleRecFormModal}
          tripId={trip.tripId}>
        </AddOrEditRecForm>
      </div>
    );
  }
}

export default SingleTrip;
