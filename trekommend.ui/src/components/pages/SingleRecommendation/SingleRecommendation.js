import React from 'react';
import './SingleRecommendation.scss';

import RecommendationData from '../../../helpers/data/RecommendationData';
import UserData from '../../../helpers/data/UserData';
import RecPhotoData from '../../../helpers/data/RecPhotoData';
import RecCategoryData from '../../../helpers/data/RecCategoryData';

class SingleRecommendation extends React.Component {
  state = {
    rec: {},
    recPhotos: [],
    recCategory: '',
    user: {},
  }

  getRec = () => {
    const { recommendationId } = this.props.match.params;
    RecommendationData.getSingleRecommendation(recommendationId)
      .then((resp) => {
        this.setState({ rec: resp });
        RecCategoryData.getSingleRecCategory(resp.recCategoryId)
          .then((r) => this.setState({ recCategory: r }))
          .catch((err) => console.error('could not get rec categories', err));
      })
      .catch((err) => console.error('could not get recommendation', err));
  }

  getRecPhotos = () => {
    const { recommendationId } = this.props.match.params;
    RecPhotoData.getPhotosByRecId(recommendationId)
      .then((resp) => this.setState({ recPhotos: resp }))
      .catch((err) => console.error('could not get recommendation photos', err));
  }

  getUser = () => {
    const { userId } = this.props.match.params;
    UserData.getUserByUserId(userId)
      .then((resp) => this.setState({ user: resp }))
      .catch((err) => console.error('could not get user object', err));
  }

  // to do: add get rec category

  componentDidMount() {
    this.getRec();
    this.getRecPhotos();
    this.getUser();
  }

  addToPlannedTrip = () => {
    // to do: this will launch something to add rec to your own planned trip
    console.error('save this rec to your own planned trip and update current rec TimesSaved property');
  }

  render() {
    const {
      rec,
      recPhotos,
      recCategory,
      user,
    } = this.state;
    // to-do: create a gallery or slideshow shared component for rec photos

    return (
      <div className="SingleRecommendation">
        <div className="rec-summary row">
          <div className="rec-summary-cover-photo-container col-4">
            { recPhotos.length > 0
              ? <img className="" src={recPhotos[0].photoUrl} alt={`${rec.title} card cover`}/>
              : <img className="" src="https://i.imgur.com/b2AvRuB.jpg" alt={`${rec.title} card cover`}/>
            }
          </div>

          <div className="rec-summary-details-container col-8">
            <h2>{rec.title}</h2>
            <p>Recommendation By: {user.firstName} {user.lastName}</p>
            { rec.rating !== null
              ? <p>Rating: {rec.rating}/5</p>
              : ''
           }
            <p>Category: {recCategory}</p>
            <button className="btn btn-outline-dark" onClick={this.addToPlannedTrip} >Save</button>
            <p className="subtle-text">Times Saved: {rec.timesSaved}</p>
          </div>

          <div className="rec-review-container container">
            <p>Description: {rec.description}</p>
            <p>Review: {rec.review}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleRecommendation;
