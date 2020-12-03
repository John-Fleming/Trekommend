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

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar></MyNavbar>
              <Switch>
                <Route path='/profile' component={UserProfile}/>
                {/* <Route path='/trips/:tripId' component={SingleTrip}/>
                <Route path='/recommendation/:recommendationId' component={SingleRecommendation}/>
                <Route path='/trips' component={Trips}/> */}
                {/* <Route path='/discover' component={SearchResults}/> */}
                {/* <Route path='/login' component={Login}/> */}
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