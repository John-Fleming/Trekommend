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

  getUser = (userId) => {
    UserData.getUserByUserId(userId)
      .then((resp) => this.setState({ user: resp }))
      .catch((err) => console.error('could not get user object', err));
  }

  getUsersTrips = (userId) => {
    TripData.getTripsByUserId(userId)
      .then((resp) => this.setState({ trips: resp }))
      .catch((err) => console.error('could not get user trips', err));
  }

  getUserTripData = () => {
    const { userId } = this.props.match.params;
    this.getUser(userId);
    this.getUsersTrips(userId);
  }

  componentDidMount() {
    this.getUserTripData();
  }

  toggleTripFormModal = () => {
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
        <button className="btn" onClick={this.toggleTripFormModal}><i className="fas fa-plus"></i></button>
        <div className="Trips-container">
          {buildTripCards}
        </div>

        <AddOrEditTripForm
          tripFormModal={tripFormModal}
          editingTrip={editingTrip}
          getUserTripData={this.getUserTripData}
          toggleTripFormModal={this.toggleTripFormModal}>
        </AddOrEditTripForm>
      </div>
    );
  }
}

export default Trips;
