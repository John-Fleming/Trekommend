import React from 'react';
import './App.scss';

import UserProfile from '../components/pages/UserProfile/UserProfile';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <UserProfile></UserProfile>
      </div>
    );
  }
}

export default App;
