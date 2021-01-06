import React from 'react';
import { Rating } from '@material-ui/lab';
import './SingleRecommendation.scss';

import SaveUserRecForm from '../../shared/SaveUserRecForm/SaveUserRecForm';

import RecommendationData from '../../../helpers/data/RecommendationData';
import UserData from '../../../helpers/data/UserData';
import RecPhotoData from '../../../helpers/data/RecPhotoData';
import RecCategoryData from '../../../helpers/data/RecCategoryData';
import AuthData from '../../../helpers/data/AuthData';
import TripData from '../../../helpers/data/TripData';

class SingleRecommendation extends React.Component {
  state = {
    rec: {},
    recPhotos: [],
    recCategory: '',
    ratingValue: '',
    user: {},
    authedUserPlannedTrips: [],
    isAuthedUser: false,
    saveUserRecModal: false,
  }

  getRec = () => {
    const { recommendationId } = this.props.match.params;
    RecommendationData.getSingleRecommendation(recommendationId)
      .then((resp) => {
        this.setState({ rec: resp, ratingValue: Number(resp.rating) });
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
      .then((resp) => {
        this.setState({ user: resp });
        const authedUserUid = AuthData.getUid();

        if (resp.uuid === authedUserUid) this.setState({ isAuthedUser: true });
      })
      .catch((err) => console.error('could not get user object', err));
  }

  getAuthedUserPlannedTrips = () => {
    const authedUuid = AuthData.getUid();
    AuthData.getUserByUuid(authedUuid)
      .then((resp) => {
        TripData.getUsersPlannedTrips(resp.userId)
          .then((r) => this.setState({ authedUserPlannedTrips: r }));
      })
      .catch((err) => console.error('could not get authed user', err));
  }

  componentDidMount() {
    this.getRec();
    this.getRecPhotos();
    this.getUser();
    this.getAuthedUserPlannedTrips();
  }

  toggleSaveUserRecModal = () => {
    this.setState({ saveUserRecModal: !this.state.saveUserRecModal });
  }

  render() {
    const {
      rec,
      recPhotos,
      recCategory,
      ratingValue,
      user,
      isAuthedUser,
      authedUserPlannedTrips,
      saveUserRecModal,
    } = this.state;
    // to-do: create a gallery or slideshow shared component for rec photos

    return (
      <div className="SingleRecommendation">
        <div className="rec-summary row">
          <div className="rec-summary-overview-container col-md-4">
            <h2 className="rec-summary-overview-container-title">{rec.title}</h2>

            { recPhotos.length > 0
              ? <img className="" src={recPhotos[0].photoUrl} alt={`${rec.title} card cover`}/>
              : <img className="" src="https://i.imgur.com/b2AvRuB.jpg" alt={`${rec.title} card cover`}/>
            }

            <p className="rec-summary-overview-container-rating">
              {recCategory}
              { rec.rating !== null
                ? <span><span className="mx-2">|</span><Rating name="read-only" value={ratingValue} size="small" readOnly /></span>
                : ''
              }
            </p>

          </div>

          <div className="rec-summary-review-container col-md-8">
            <span className="rec-summary-review-container-subtitle">Reccomended By:</span>
            <p>{user.firstName} {user.lastName}</p>

            <span className="rec-summary-review-container-subtitle">Description:</span>
            <p>{rec.description}</p>

            <span className="rec-summary-review-container-subtitle">Review:</span>
            <p>{rec.review}</p>

            { isAuthedUser
              ? ''
              : <button className="btn btn-outline-dark save-rec-btn" onClick={this.toggleSaveUserRecModal} >Save</button>
            }

            <p className="subtle-text">Times Saved: {rec.timesSaved}</p>
          </div>
        </div>

        <SaveUserRecForm
          saveUserRecModal={saveUserRecModal}
          authedUserPlannedTrips={authedUserPlannedTrips}
          toggleSaveUserRecModal={this.toggleSaveUserRecModal}>
        </SaveUserRecForm>
      </div>
    );
  }
}

export default SingleRecommendation;
