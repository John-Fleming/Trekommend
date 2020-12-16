import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'; // eslint-disable-line

import './AddOrEditTripForm.scss';
import TripData from '../../../helpers/data/TripData';

class AddOrEditTripForm extends React.Component {
  state = {
    userId: 1, // to do: update this to be authed user
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    coverPhoto: '',
    isPlanned: false,
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  locationChange = (e) => {
    e.preventDefault();
    this.setState({ location: e.target.value });
  }

  plannedCheckboxChange = (e) => {
    e.preventDefault();
    this.setState({ isPlanned: e.target.checked });
  }

  startDateChange = (e) => {
    e.preventDefault();
    this.setState({ startDate: e.target.value });
  }

  endDateChange = (e) => {
    e.preventDefault();
    this.setState({ endDate: e.target.value });
  }

  photoUrlChange = (e) => {
    e.preventDefault();
    this.setState({ coverPhoto: e.target.value });
  }

  toggleTripModal = (e) => {
    e.preventDefault();
    const { toggleTripFormModal } = this.props;
    toggleTripFormModal();
  }

  submitTrip = () => {
    const { getUserTripData } = this.props;
    const { userId, name, location, startDate, endDate, coverPhoto, isPlanned } = this.state; // eslint-disable-line
    const newTrip = {
      userId,
      name,
      location,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      coverPhoto,
      isPlanned,
    };

    console.error(newTrip);

    TripData.addNewTrip(newTrip)
      .then(() => getUserTripData())
      .catch((err) => console.error('could not submit new trip', err));
  }

  render() {
    const { name, location, startDate, endDate, coverPhoto, isPlanned } = this.state; // eslint-disable-line
    const { tripFormModal, editingTrip } = this.props;

    return (
      <Modal className="AddOrEditTripForm" isOpen={tripFormModal} toggle={this.toggleTripModal}>
        <ModalHeader>{editingTrip ? 'Update Trip Details' : 'Create New Trip'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="trip-name">Trip Name</Label>
              <Input type="text" name="trip-name" id="trip-name" placeholder="Enter a trip name" value={name} onChange={this.nameChange} required/>
            </FormGroup>

            <FormGroup>
              <Label for="trip-location">Location</Label>
              <Input type="text" name="trip-location" id="trip-location" placeholder="Ex. Los Angeles, CA" value={location} onChange={this.locationChange} required/>
            </FormGroup>

            <FormGroup check className="mb-2">
              <Input type="checkbox" name="trip-isPlanned" id="trip-isPlanned" checked={isPlanned} onChange={this.plannedCheckboxChange} />
              <Label for="trip-isPlanned" check>Planning this trip?</Label>
            </FormGroup>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="trip-start-date">Start Date</Label>
                  <Input
                    type="date"
                    name="trip-start-date"
                    id="trip-start-date"
                    placeholder="date placeholder"
                    value={startDate}
                    onChange={this.startDateChange}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="trip-end-date">End Date</Label>
                  <Input
                    type="date"
                    name="trip-end-date"
                    id="trip-end-date"
                    placeholder="date placeholder"
                    value={endDate}
                    onChange={this.endDateChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="trip-cover-photo">Cover Photo</Label>
              <Input type="text" name="trip-cover-photo" id="trip-cover-photo" placeholder="Photo URL" value={coverPhoto} onChange={this.photoUrlChange} />
            </FormGroup>

            {editingTrip
              ? <button className="btn btn-outline-dark" onClick={this.toggleTripModal}>Update</button>
              : <button className="btn btn-outline-dark" onClick={this.submitTrip}>Submit</button>
            }
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddOrEditTripForm;
