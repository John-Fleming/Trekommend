import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'; // eslint-disable-line

import './SaveUserRecForm.scss';

class SaveUserRecForm extends React.Component {
  toggleSaveRecModal = (e) => {
    e.preventDefault();
    const { toggleSaveUserRecModal } = this.props;
    toggleSaveUserRecModal();
  }

  render() {
    const { saveUserRecModal } = this.props;

    // to do - add an option to create a new trip from here if planned trip doesn't already exist
    return (
      <Modal className="SaveUserRecForm" isOpen={saveUserRecModal} toggle={this.toggleSaveRecModal}>
        <ModalHeader>Add Rec to Your Trip</ModalHeader>
        <ModalBody>
          yo - select from your planned trips below
        </ModalBody>
      </Modal>
    );
  }
}

export default SaveUserRecForm;
