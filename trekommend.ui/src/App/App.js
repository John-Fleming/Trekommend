import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
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
import DiscoverTripsAndRecs from '../components/pages/DiscoverTripsAndRecs/DiscoverTripsAndRecs';
import Home from '../components/pages/Home/Home';

import fbConnection from '../helpers/data/connection';
import AuthData from '../helpers/data/AuthData';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
    authedUser: {},
  }

  getAuthedUser = (uuid) => {
    AuthData.getUserByUuid(uuid)
      .then((resp) => this.setState({ authedUser: resp }))
      .catch((err) => console.error('there was a problem getting the authed user', err));
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getAuthedUser(user.uid);
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false, authedUser: {} });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, authedUser } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} authedUser={authedUser}></MyNavbar>
              <Switch>
                <Route path='/user/:userId/trip/:tripId' component={SingleTrip} authed={authed} authedUser={authedUser}/>
                <Route path='/user/:userId/recommendation/:recommendationId' component={SingleRecommendation} authed={authed} authedUser={authedUser}/>
                <Route path='/trips/:userId' component={Trips} authed={authed} authedUser={authedUser}/>
                <Route path='/profile/:userId' component={UserProfile} authed={authed} authedUser={authedUser}/>
                <Route path='/discover' component={DiscoverTripsAndRecs} authed={authed} authedUser={authedUser}/>
                <Route path='/login' component={Login} authed={authed} />
                <Route path='/' component={Home} authed={authed} authedUser={authedUser}/>
                <Redirect from="*" to="/" />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
