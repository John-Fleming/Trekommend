import React from 'react';
import { Link } from 'react-router-dom';
import { parseJSON, format } from 'date-fns';
import './TripCard.scss';

import UserShape from '../../../helpers/propz/UserShape';
import TripShape from '../../../helpers/propz/TripShape';

class TripCard extends React.Component {
  static propTypes = {
    user: UserShape.UserShape,
    trip: TripShape.TripShape,
  }

  render() {
    const { trip, user } = this.props;
    return (
      <div className="TripCard base-card col-md-4">
          <Link to={`/user/${user.userId}/trip/${trip.tripId}`} className="custom-link">
            <img className="card-img-top base-card-cover-photo" src={trip.coverPhoto} alt={`${trip.name} card cover`}/>
          </Link>
        <div className="base-card-details">
          <h4 className="base-card-details-title">
            <span className="mr-2">{trip.name}</span>
            <span>|</span>
            <span className="ml-2">{trip.isPlanned ? 'Planned' : `${format(parseJSON(trip.endDate), 'MMMM yyyy')}`}</span>
          </h4>
          <span className="base-card-details-subtitle">{trip.location}</span>
          <span className="base-card-details-username subtle-text">{user.firstName} {user.lastName}</span>
        </div>
      </div>
    );
  }
}

export default TripCard;
