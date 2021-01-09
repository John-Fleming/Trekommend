import React from 'react';
import './DiscoverTripsAndRecs.scss';

import AuthData from '../../../helpers/data/AuthData';
import RecommendationData from '../../../helpers/data/RecommendationData';
import TripData from '../../../helpers/data/TripData';

class DiscoverTripsAndRecs extends React.Component {
  state = {
    viewingTrips: true,
    viewingRecs: false,
    trips: [],
    recs: [],
  }

  getUserFollowingRecs = (userId) => {
    RecommendationData.getAllUserFollowingRecommendationsByUserId(userId)
      .then((resp) => this.setState({ recs: resp }))
      .catch((err) => console.error('could not get user following recs', err));
  }

  getUserFollowingTrips = (userId) => {
    TripData.getAllUserFollowingTripsByUserId(userId)
      .then((resp) => this.setState({ trips: resp }))
      .catch((err) => console.error('could not get user following recs', err));
  }

  intializeDiscoverPageData = () => {
    const authedUuid = AuthData.getUid();
    AuthData.getUserByUuid(authedUuid)
      .then((resp) => {
        this.getUserFollowingRecs(resp.userId);
        this.getUserFollowingTrips(resp.userId);
      })
      .catch((err) => console.error('could not get authed user', err));
  }

  componentDidMount() {
    this.intializeDiscoverPageData();
  }

  render() {
    return (
      <div className="DiscoverTripsAndRecs">
        yoooo
      </div>
    );
  }
}

export default DiscoverTripsAndRecs;
