import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'; // eslint-disable-line

import './AddOrEditTripForm.scss';

class AddOrEditTripForm extends React.Component {
  toggleTripModal = (e) => {
    e.preventDefault();
    const { createOrEditTrip } = this.props;
    createOrEditTrip();
  }

  render() {
    const { tripFormModal, editingTrip } = this.props;
    return (
      <Modal className="AddOrEditTripForm" isOpen={tripFormModal} toggle={this.toggleTripModal}>
        <ModalHeader>{editingTrip ? 'Update Trip Details' : 'Create New Trip'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="trip-name">Trip Name</Label>
              <Input type="text" name="trip-name" id="trip-name" placeholder="Enter a trip name" required/>
            </FormGroup>

            <FormGroup>
              <Label for="trip-location">Location</Label>
              <Input type="text" name="trip-location" id="trip-location" placeholder="Ex. Los Angeles, CA" required/>
            </FormGroup>

            <FormGroup check className="mb-2">
              <Input type="checkbox" name="trip-isPlanned" id="trip-isPlanned" required/>
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
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="trip-cover-photo">Cover Photo</Label>
              <Input type="text" name="trip-cover-photo" id="trip-cover-photo" placeholder="Photo URL" />
            </FormGroup>

            {editingTrip
              ? <button className="btn btn-outline-dark" onClick={this.toggleTripModal}>Update</button>
              : <button className="btn btn-outline-dark" onClick={this.toggleTripModal}>Submit</button>
            }
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddOrEditTripForm;
