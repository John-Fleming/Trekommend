import React from 'react';
import './Trips.scss';

import TripCard from '../../shared/TripCard/TripCard';

import UserData from '../../../helpers/data/UserData';
import TripData from '../../../helpers/data/TripData';

class Trips extends React.Component {
  state = {
    user: {},
    trips: [],
  }

  getUser = () => {
    const userId = 1; // will reset this to use authed user later
    UserData.getUserByUserId(userId)
      .then((resp) => this.setState({ user: resp }))
      .catch((err) => console.error('could not get user object', err));
  }

  getUsersTrips = () => {
    const userId = 1; // will reset this to use authed user later
    TripData.getTripsByUserId(userId)
      .then((resp) => this.setState({ trips: resp }))
      .catch((err) => console.error('could not get user trips', err));
  }

  componentDidMount() {
    this.getUser();
    this.getUsersTrips();
  }

  render() {
    const { user, trips } = this.state;

    const buildTripCards = trips.map((trip, index) => <TripCard key={index} trip={trip} user={user}/>);

    return (
      <div className="Trips">
        {user.firstName} {user.lastName}'s Trips <button className="btn"><i className="fas fa-plus"></i></button>
        <div className="trips-container">
          {buildTripCards}
        </div>
      </div>
    );
  }
}

export default Trips;
