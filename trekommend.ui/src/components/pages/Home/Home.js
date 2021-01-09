import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="cta">
          <h1 className="greeting">Discover Your Next <br/> Trekommendation</h1>
          <Link to={'/Discover'} className="btn btn-outline-dark btn-lg cta-btn">Explore Now</Link>
        </div>
      </div>
    );
  }
}

export default Home;
