import PropTypes from 'prop-types';

const TripShape = PropTypes.shape({
  tripId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  coverPhoto: PropTypes.string,
  isPlanned: PropTypes.bool.isRequired,
});

export default {TripShape}; // eslint-disable-line
