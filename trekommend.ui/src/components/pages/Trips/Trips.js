import React from 'react';
import './Trips.scss';

import TripCard from '../../shared/TripCard/TripCard';
import AddOrEditTripForm from '../../shared/AddOrEditTripForm/AddOrEditTripForm';

import UserData from '../../../helpers/data/UserData';
import TripData from '../../../helpers/data/TripData';

class Trips extends React.Component {
  state = {
    user: {},
    trips: [],
    tripFormModal: false,
    editingTrip: false,
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

  createOrEditTrip = () => {
    this.setState({ tripFormModal: !this.state.tripFormModal });
  }

  render() {
    const {
      user,
      trips,
      tripFormModal,
      editingTrip,
    } = this.state;

    const buildTripCards = trips.map((trip, index) => <TripCard key={index} trip={trip} user={user}/>);

    return (
      <div className="Trips">
        <span className="Trips-header">
          {user.firstName} {user.lastName}'s Trips [{trips.length}]
        </span>
        {/* to do: only render the below button if the user in state equals the authed user */}
        <button className="btn" onClick={this.createOrEditTrip}><i className="fas fa-plus"></i></button>
        <div className="Trips-container">
          {buildTripCards}
        </div>

        <AddOrEditTripForm
          tripFormModal={tripFormModal}
          editingTrip={editingTrip}
          createOrEditTrip={this.createOrEditTrip}>
        </AddOrEditTripForm>
      </div>
    );
  }
}

export default Trips;
