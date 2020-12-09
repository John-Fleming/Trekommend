import PropTypes from 'prop-types';

const UserShape = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  dateJoined: PropTypes.string.isRequired,
  userPhoto: PropTypes.string.isRequired,
});

export default {UserShape}; // eslint-disable-line
