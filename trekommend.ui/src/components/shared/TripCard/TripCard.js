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
      <div className="TripCard base-card col-md-5">
          <Link to={`/user/${user.userId}/trip/${trip.tripId}`} className="custom-link">
            <img className="card-img-top base-card-cover-photo" src={trip.coverPhoto} alt={`${trip.name} card cover`}/>
          </Link>
        <div className="base-card-details">
          <h6>
            <span className="mr-2">{trip.name}</span>|
            <span className="ml-2">{trip.isPlanned ? 'Planned' : `${format(parseJSON(trip.startDate), 'MMMM yyyy')}`}</span>
          </h6>
          <p>{trip.location}</p>
          <span className="base-card-details-username subtle-text">{user.firstName} {user.lastName}</span>
        </div>
      </div>
    );
  }
}

export default TripCard;
