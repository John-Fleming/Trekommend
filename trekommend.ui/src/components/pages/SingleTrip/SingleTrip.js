import React from 'react';
import './SingleTrip.scss';

import TripData from '../../../helpers/data/TripData';
import RecommendationData from '../../../helpers/data/RecommendationData';

class SingleTrip extends React.Component {
  state = {
    trip: {},
    recommendations: [],
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

  componentDidMount() {
    this.getTrip();
    this.getRecommendations();
  }

  createNewRec = () => {
    // to do - this click event will launch a modal with a form to add a new rec
    console.error('add a new rec');
  }

  render() {
    const { trip, recommendations } = this.state;

    const buildRecommendationCards = recommendations.map((rec, index) => <p>{rec.title}</p>);

    return (
      <div className="SingleTrip">
        <div className="jumbotron text-center">
          <h2 className="display-4">{trip.name}</h2>
          <p className="lead">{trip.location}</p>
        </div>
        <div className="SingleTrip-recommendations-container">
          Recommendations <button className="btn" onClick={this.createNewRec}><i className="fas fa-plus"></i></button>
          {buildRecommendationCards}
        </div>
      </div>
    );
  }
}

export default SingleTrip;
