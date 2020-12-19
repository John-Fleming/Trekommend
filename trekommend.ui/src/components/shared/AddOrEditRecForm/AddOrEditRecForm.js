import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'; // eslint-disable-line

import './AddOrEditRecForm.scss';
import RecommendationData from '../../../helpers/data/RecommendationData';
import RecPhotoData from '../../../helpers/data/RecPhotoData';
import RecCategoryData from '../../../helpers/data/RecCategoryData';

class AddOrEditRecForm extends React.Component {
  state = {
    recCategoryId: '',
    title: '',
    rating: null,
    review: null,
    description: null,
    photoUrl: null,
    recCategories: [],
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  ratingChange = (e) => {
    e.preventDefault();
    this.setState({ rating: e.target.value * 1 });
  }

  categoryChange = (e) => {
    e.preventDefault();
    this.setState({ recCategoryId: e.target.value * 1 });
  }

  reviewChange = (e) => {
    e.preventDefault();
    this.setState({ review: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  recPhotoChange = (e) => {
    e.preventDefault();
    this.setState({ photoUrl: e.target.value });
  }

  toggleRecModal = (e) => {
    e.preventDefault();
    const { toggleRecFormModal } = this.props;
    toggleRecFormModal();
  }

  componentDidMount() {
    RecCategoryData.getAllRecCategories()
      .then((resp) => this.setState({ recCategories: resp }))
      .catch((err) => console.error('could not get rec categories', err));
  }

  submitRecPhoto = (newPhoto) => {
    RecPhotoData.addRecPhoto(newPhoto)
      .then()
      .catch((err) => console.error('could not add rec photo', err));
  }

  submitRec = () => {
    const { intializeSingleTripPageData, tripId } = this.props;
    const { title, recCategoryId, rating, review, description, photoUrl } = this.state; // eslint-disable-line
    const newRec = {
      userId: 1,
      tripId,
      recCategoryId,
      title,
      rating,
      review,
      description,
      timesSaved: 0,
    };

    RecommendationData.addNewRec(newRec)
      .then((resp) => {
        if (photoUrl !== null) {
          const newPhoto = {
            recId: resp.recId,
            photoUrl,
          };

          this.submitRecPhoto(newPhoto);
        }
        intializeSingleTripPageData();
        this.toggleRecModal();
      })
      .catch((err) => console.error('could not add new recommendation', err));
  }

  render() {
    const { title, review, description, recCategories, photoUrl } = this.state; // eslint-disable-line
    const { recFormModal, editingRec } = this.props;
    return (
      <Modal className="AddOrEditTripForm" isOpen={recFormModal} toggle={this.toggleRecModal}>
        <ModalHeader>{editingRec ? 'Update Recommendation Details' : 'Create New Recommendation'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="rec-title">Title</Label>
              <Input type="text" name="rec-title" id="rec-title" placeholder="Enter a recommendation title" value={title} onChange={this.titleChange} required/>
            </FormGroup>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="rec-rating">Rating</Label>
                  <Input type="select" name="rec-rating" id="rec-rating" onChange={this.ratingChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="rec-category">Category</Label>
                  <Input type="select" name="rec-category" id="rec-category" onChange={this.categoryChange} required>
                    {recCategories.map((cat, index) => <option key={index} value={cat.recCategoryId}>{cat.type}</option>)}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="rec-review">Review</Label>
              <Input type="textarea" name="rec-review" id="rec-review" placeholder="Review your recommendation" value={review} onChange={this.reviewChange} />
            </FormGroup>

            <FormGroup>
              <Label for="rec-description">Description</Label>
              <Input type="textarea" name="rec-description" id="rec-description" placeholder="Enter a description of your recommendation" value={description} onChange={this.descriptionChange} />
            </FormGroup>

            <FormGroup>
              <Label for="rec-photo">Recommendation Photo</Label>
              <Input type="text" name="rec-photo" id="rec-photo" placeholder="Photo URL" value={photoUrl} onChange={this.recPhotoChange} />
            </FormGroup>

            {editingRec
              ? <button className="btn btn-outline-dark" onClick={this.toggleRecModal}>Update</button>
              : <button className="btn btn-outline-dark" onClick={this.submitRec}>Submit</button>
            }
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddOrEditRecForm;
