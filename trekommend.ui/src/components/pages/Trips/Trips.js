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
    const { userId } = this.props.match.params;
    UserData.getUserByUserId(userId)
      .then((resp) => this.setState({ user: resp }))
      .catch((err) => console.error('could not get user object', err));
  }

  getUsersTrips = () => {
    const { userId } = this.props.match.params;
    TripData.getTripsByUserId(userId)
      .then((resp) => this.setState({ trips: resp }))
      .catch((err) => console.error('could not get user trips', err));
  }

  componentDidMount() {
    this.getUser();
    this.getUsersTrips();
  }

  createNewTrip = () => {
    // to do - this click event will launch a modal with a form to add a new trip
    console.error('add a trip');
  }

  render() {
    const { user, trips } = this.state;

    const buildTripCards = trips.map((trip, index) => <TripCard key={index} trip={trip} user={user}/>);

    return (
      <div className="Trips">
        <span className="Trips-header">
          {user.firstName} {user.lastName}'s Trips [{trips.length}]
        </span>
        <button className="btn" onClick={this.createNewTrip}><i className="fas fa-plus"></i></button>
        <div className="Trips-container">
          {buildTripCards}
        </div>
      </div>
    );
  }
}

export default Trips;
