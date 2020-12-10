import React from 'react';
// import { Link } from 'react-router-dom';
import './RecommendationCard.scss';

import RecShape from '../../../helpers/propz/RecShape';
import RecPhotoData from '../../../helpers/data/RecPhotoData';

class RecomendationCard extends React.Component {
  static propTypes = {
    rec: RecShape.RecShape,
  }

  state = {
    recPhotos: [],
  }

  getRecPhotos = () => {
    const { recId } = this.props.rec;
    RecPhotoData.getPhotosByRecId(recId)
      .then((resp) => this.setState({ recPhotos: resp }))
      .catch((err) => console.error('could not get rec photos', err));
  }

  componentDidMount() {
    this.getRecPhotos();
  }

  render() {
    const { rec, user } = this.props;
    // const { recPhotos } = this.state;

    return (
      <div className="RecommendationCard card base-card col-md-5">
        {/* <Link to={`/recommendation/${rec.recId}`}>
            <img className="card-img-top rec-cover-photo" src={recPhotos[0].photoUrl} alt={`${rec.title} card cover`}/>
        </Link> */}
        <div className="base-card-details card-body">
          <h6>{rec.title}</h6>
          <p>{rec.rating}</p>
          <span className="base-card-user-name subtle-text">{user.firstName} {user.lastName}</span>
        </div>
      </div>
    );
  }
}

export default RecomendationCard;
