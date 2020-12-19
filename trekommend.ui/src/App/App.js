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

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}></MyNavbar>
              <Switch>
                <PrivateRoute path='/user/:userId/trip/:tripId' component={SingleTrip} authed={authed}/>
                <PrivateRoute path='/user/:userId/recommendation/:recommendationId' component={SingleRecommendation} authed={authed}/>
                <PrivateRoute path='/trips/:userId' component={Trips} authed={authed}/>
                <PrivateRoute path='/profile/:userId' component={UserProfile} authed={authed}/>
                {/* <PrivateRoute path='/discover' component={SearchResults} authed={authed}/> */}
                {/* <PrivateRoute path='/' component={Home} authed={authed} /> */}
                <PublicRoute path='/login' component={Login} authed={authed}/>
                <Redirect from="*" to="/" />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
