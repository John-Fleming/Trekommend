import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'; // eslint-disable-line

import './SaveUserRecForm.scss';

import RecommendationData from '../../../helpers/data/RecommendationData';

class SaveUserRecForm extends React.Component {
  state = {
    selectedTripId: '',
  }

  plannedTripChange = (e) => {
    e.preventDefault();
    this.setState({ selectedTripId: e.target.value * 1 });
  }

  toggleSaveRecModal = (e) => {
    e.preventDefault();
    const { toggleSaveUserRecModal } = this.props;
    toggleSaveUserRecModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedTripId } = this.state;
    const { rec, authedUser, routeToSelectedTrip } = this.props;

    const newRec = {
      userId: authedUser.userId,
      tripId: selectedTripId,
      recCategoryId: rec.recCategoryId,
      title: rec.title,
      timesSaved: 0,
    };

    RecommendationData.addNewRec(newRec)
      .then(() => routeToSelectedTrip(authedUser.userId, selectedTripId))
      .catch((err) => console.error('could not save rec', err));
  };

  render() {
    const { saveUserRecModal, authedUserPlannedTrips } = this.props;

    // to do - add an option to create a new trip from here if planned trip doesn't already exist
    return (
      <Modal className="SaveUserRecForm" isOpen={saveUserRecModal} toggle={this.toggleSaveRecModal}>
        <ModalHeader>Save this Recommendation</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="planned-trips">Select from your planned trips:</Label>
              <Input type="select" name="rec-rating" id="rec-rating" onChange={this.plannedTripChange} required>
                <option value="" disabled selected hidden>Trips</option>
                {authedUserPlannedTrips.map((trip, index) => <option key={index} value={trip.tripId}>{trip.name}</option>)}
              </Input>
            </FormGroup>

            <button className="btn btn-outline-dark" onClick={this.handleSubmit}>Save</button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default SaveUserRecForm;
