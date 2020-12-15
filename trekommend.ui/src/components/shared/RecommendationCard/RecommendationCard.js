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
      <div className="RecommendationCard base-card col-md-4">
        <Link to={`/user/${user.userId}/recommendation/${rec.recId}`} className="custom-link">
          { rec.photos.length > 0
            ? <img className="card-img-top base-card-cover-photo" src={rec.photos[0].photoUrl} alt={`${rec.title} card cover`}/>
            : <img className="card-img-top base-card-cover-photo" src="https://i.imgur.com/b2AvRuB.jpg" alt={`${rec.title} card cover`}/>
          }
        </Link>
        <div className="base-card-details">
          <h4 className="base-card-details-title">{rec.title}</h4>
          { rec.rating !== null
            ? <span className="base-card-details-subtitle">Rating: {rec.rating}/5</span>
            : ''
          }
          <span className="base-card-details-username subtle-text">{user.firstName} {user.lastName}</span>
        </div>
      </div>
    );
  }
}

export default RecomendationCard;
