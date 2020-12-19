import React from 'react';
import './App.scss';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import UserProfile from '../components/pages/UserProfile/UserProfile';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import Trips from '../components/pages/Trips/Trips';
import SingleTrip from '../components/pages/SingleTrip/SingleTrip';
import SingleRecommendation from '../components/pages/SingleRecommendation/SingleRecommendation';
import Login from '../components/pages/Login/Login';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar></MyNavbar>
              <Switch>
                <Route path='/user/:userId/trip/:tripId' component={SingleTrip}/>
                <Route path='/user/:userId/recommendation/:recommendationId' component={SingleRecommendation}/>
                <Route path='/trips/:userId' component={Trips}/>
                <Route path='/profile/:userId' component={UserProfile}/>
                {/* <Route path='/discover' component={SearchResults}/> */}
                <Route path='/login' component={Login}/>
                {/* <Route path='/' component={Home} /> */}
                <Redirect from="*" to="/" />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
