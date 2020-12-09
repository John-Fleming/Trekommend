import React from 'react';
import { Link } from 'react-router-dom';
import { parseJSON, format } from 'date-fns';
import './TripCard.scss';

class TripCard extends React.Component {
  render() {
    const { trip, user } = this.props;
    return (
      <div className="TripCard col-md-5">
          <Link to={`/trip/${trip.tripId}`}>
            <img className="card-img-top trip-cover-photo" src={trip.coverPhoto} alt="{trip.name} card cover"/>
          </Link>
        <div className="TripCard-details">
          <h6>{trip.name}   |   {trip.isPlanned ? 'Planned' : `${format(parseJSON(trip.startDate), 'MMMM yyyy')}`}</h6>
          <p>{trip.location}</p>
          <span className="TripCard-user-name subtle-text">{user.firstName} {user.lastName}</span>
        </div>
      </div>
    );
  }
}

export default TripCard;
