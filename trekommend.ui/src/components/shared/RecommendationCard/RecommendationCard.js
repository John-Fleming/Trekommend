import React from 'react';
import { Link } from 'react-router-dom';
import './RecommendationCard.scss';

import RecShape from '../../../helpers/propz/RecShape';
// import RecPhotoData from '../../../helpers/data/RecPhotoData';

class RecomendationCard extends React.Component {
  static propTypes = {
    rec: RecShape.RecShape,
  }

  render() {
    const { rec, user } = this.props;

    // to do  - get the recPhotos on the rec objects within the same API call and add to this card
    return (
      <div className="RecommendationCard card base-card col-md-5">
        <Link to={`/recommendation/${rec.recId}`}>
          { rec.photos.length > 0
            ? <img className="card-img-top base-card-cover-photo" src={rec.photos[0].photoUrl} alt={`${rec.title} card cover`}/>
            : <img className="card-img-top base-card-cover-photo" src="https://i.imgur.com/b2AvRuB.jpg" alt={`${rec.title} card cover`}/>
          }
        </Link>
        <div className="base-card-details card-body">
          <h6>{rec.title}</h6>
          { rec.rating !== null
            ? <p>Rating: {rec.rating}/5</p>
            : ''
          }
          <span className="base-card-details-username subtle-text">{user.firstName} {user.lastName}</span>
        </div>
      </div>
    );
  }
}

export default RecomendationCard;
