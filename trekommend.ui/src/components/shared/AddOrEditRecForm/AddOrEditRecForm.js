import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'; // eslint-disable-line

import './AddOrEditRecForm.scss';
// import RecommendationData from '../../../helpers/data/RecommendationData';
// import RecPhotoData from '../../../helpers/data/RecPhotoData';
// import RecCategoryData from '../../../helpers/data/RecCategoryData';

class AddOrEditRecForm extends React.Component {
  state = {
    userId: 1, // to do: update this to be authed user
    tripId: this.props.tripId,
    recCategoryId: '',
    title: '',
    rating: '',
    review: '',
    description: '',
    timesSaved: 0,
  }

  toggleRecModal = (e) => {
    e.preventDefault();
    const { toggleRecFormModal } = this.props;
    toggleRecFormModal();
  }

  render() {
    const { recCategoryId, title, rating, review, description } = this.state; // eslint-disable-line
    const { recFormModal, editingRec } = this.props;
    return (
      <Modal className="AddOrEditTripForm" isOpen={recFormModal} toggle={this.toggleRecModal}>
        <ModalHeader>{editingRec ? 'Update Recommendation Details' : 'Create New Recommendation'}</ModalHeader>
        <ModalBody>Test</ModalBody>
      </Modal>
    );
  }
}

export default AddOrEditRecForm;
