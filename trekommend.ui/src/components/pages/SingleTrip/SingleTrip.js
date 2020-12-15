import React from 'react';
import './SingleTrip.scss';

import RecommendationCard from '../../shared/RecommendationCard/RecommendationCard';

import TripData from '../../../helpers/data/TripData';
import RecommendationData from '../../../helpers/data/RecommendationData';
import UserData from '../../../helpers/data/UserData';

class SingleTrip extends React.Component {
  state = {
    trip: {},
    recommendations: [],
    user: {},
  }

  getTrip = () => {
    const { tripId } = this.props.match.params;
    TripData.getSingleTrip(tripId)
      .then((resp) => this.setState({ trip: resp }))
      .catch((err) => console.error('could not get trip', err));
  }

  getRecommendations = () => {
    const { tripId } = this.props.match.params;
    RecommendationData.getRecommendationsByTripId(tripId)
      .then((resp) => this.setState({ recommendations: resp }))
      .catch((err) => console.error('could not get recommendations', err));
  }

  getUser = () => {
    const { userId } = this.props.match.params;
    UserData.getUserByUserId(userId)
      .then((resp) => this.setState({ user: resp }))
      .catch((err) => console.error('could not get user object', err));
  }

  componentDidMount() {
    this.getTrip();
    this.getRecommendations();
    this.getUser();
  }

  createNewRec = () => {
    // to do - this click event will launch a modal with a form to add a new rec
    console.error('add a new rec');
  }

  render() {
    const { trip, recommendations, user } = this.state;

    const buildRecommendationCards = recommendations.map((rec, index) => <RecommendationCard key={index} rec={rec} user={user}/>);

    return (
      <div className="SingleTrip">
        <div className="jumbotron text-center">
          <h2 className="display-4 trip-name">{trip.name}</h2>
          <span className="lead">{trip.location}</span>
        </div>

        <div>
          {user.firstName} {user.lastName}'s Recommendations [{recommendations.length}] <button className="btn" onClick={this.createNewRec}><i className="fas fa-plus"></i></button>
        </div>

        <div className="SingleTrip-recommendations-container">
          {buildRecommendationCards}
        </div>
      </div>
    );
  }
}

export default SingleTrip;
