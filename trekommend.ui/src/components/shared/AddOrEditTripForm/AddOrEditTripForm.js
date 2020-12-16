import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import './AddOrEditTripForm.scss';

class AddOrEditTripForm extends React.Component {
  toggleTripModal = (e) => {
    e.preventDefault();
    const { createOrEditTrip } = this.props;
    createOrEditTrip();
  }

  render() {
    const { tripFormModal } = this.props;
    return (
      <Modal className="AddOrEditTripForm" isOpen={tripFormModal} toggle={this.toggleTripModal}>
        <ModalHeader>Trip Details</ModalHeader>
        <ModalBody>
          Here are some fields
          <button className="btn btn-outline-dark" onClick={this.toggleTripModal}>close</button>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddOrEditTripForm;
