import React from 'react';
import './TripCard.scss';

class TripCard extends React.Component {
  render() {
    const { trip, user } = this.props;
    return (
      // to do - add ternary to either dates as a range (ex. March 2020 - April 2020) or some sort of callout for planned trips
      // to do - make the whole card clickable to link to single trip component
      <div className="TripCard col-md-5">
          <img className="card-img-top trip-cover-photo" src={trip.coverPhoto} alt="{trip.name} card cover"/>
        <div className="TripCard-details">
          <h6>{trip.name}</h6>
          <p>{trip.location}</p>
          <span className="TripCard-user-name subtle-text">{user.firstName} {user.lastName}</span>
        </div>
      </div>
    );
  }
}

export default TripCard;
