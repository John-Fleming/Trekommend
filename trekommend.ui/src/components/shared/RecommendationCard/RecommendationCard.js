import React from 'react';
import { Link } from 'react-router-dom';
import './RecommendationCard.scss';

import RecShape from '../../../helpers/propz/RecShape';

class RecomendationCard extends React.Component {
  static propTypes = {
    rec: RecShape.RecShape,
  }

  render() {
    const { rec, user } = this.props;
    return (
      <Link className="RecommendationCard card base-card col-md-5" to={`/recommendation/${rec.recId}`}>
        {/* <Link to={`/recommendation/${rec.recId}`}> */}
            {/* <img className="card-img-top trip-cover-photo" src={rec.coverPhoto} alt="{trip.name} card cover"/> */}
          <div className="base-card-details card-body">
            <h6>{rec.title}</h6>
            <p>{rec.rating}</p>
            <span className="base-card-user-name subtle-text">{user.firstName} {user.lastName}</span>
          </div>
        {/* </Link> */}
      </Link>
    );
  }
}

export default RecomendationCard;
