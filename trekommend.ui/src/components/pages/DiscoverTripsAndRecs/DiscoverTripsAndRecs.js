import React from 'react';
import { CustomInput, Form, FormGroup } from 'reactstrap';
import './DiscoverTripsAndRecs.scss';

import RecommendationCard from '../../shared/RecommendationCard/RecommendationCard';
import TripCard from '../../shared/TripCard/TripCard';

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

  handleToggle = (e) => {
    this.setState({ viewingTrips: !this.state.viewingTrips, viewingRecs: !this.state.viewingRecs });
  }

  render() {
    const {
      viewingTrips,
      viewingRecs,
      trips,
      recs,
    } = this.state;

    const renderHeader = () => {
      let header = '';

      if (viewingTrips && !viewingRecs) {
        header = `Discover Trip Destinations [${trips.length}]`;
      } else if (viewingRecs && !viewingTrips) {
        header = `Discover Recommendations [${recs.length}]`;
      }

      return (header);
    };

    const renderTripOrRecCards = () => {
      let cards = '';

      if (viewingTrips && !viewingRecs) {
        cards = trips.map((trip, index) => <TripCard key={index} trip={trip} user={trip.user}/>);
      } else if (viewingRecs && !viewingTrips) {
        cards = recs.map((rec, index) => <RecommendationCard key={index} rec={rec} user={rec.user}/>);
      }

      return (cards);
    };

    return (
      <div className="DiscoverTripsAndRecs">
        <div className="filtering-options-container col-md-8 col-10 mx-auto">
          <span className="filtering-options-container-header">
            {renderHeader()}
          </span>

          <div className="filtering-options-container-type-toggle">
            <Form>
              <FormGroup>
                <div className="row">
                  <span className="mr-2">Trips</span>
                  <CustomInput type="switch" id="TripsOrRecsToggle" name="TripsOrRecsToggle" onChange={this.handleToggle} />
                  <span>Recommendations</span>
                </div>
              </FormGroup>
            </Form>
          </div>
        </div>

        <div className="trips-and-recs-cards-container col-md-8 col-10 mx-auto my-5">
          {renderTripOrRecCards()}
        </div>
      </div>
    );
  }
}

export default DiscoverTripsAndRecs;
