import PropTypes from 'prop-types';

const RecShape = PropTypes.shape({
  recId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  tripId: PropTypes.number.isRequired,
  recCategoryId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  review: PropTypes.string,
  description: PropTypes.string,
  timesSaved: PropTypes.number,
});

export default {RecShape}; //eslint-disable-line
