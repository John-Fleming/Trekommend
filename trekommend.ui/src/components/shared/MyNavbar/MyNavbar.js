import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  render() {
    const { authed, authedUser } = this.props;

    if (authed) {
      return (
        <div className="MyNavbar">
            <Navbar color="light" light>
              <NavLink tag={RRNavLink} to="/home" className="brand-header navbar-brand">Trekommend</NavLink>
                <Nav className="ml-auto flex-row" navbar>
                  <NavItem className="mr-2">
                    <NavLink tag={RRNavLink} to="/profile"><i className="fas fa-search text-dark"></i></NavLink>
                  </NavItem>
                  <NavItem className="mx-2">
                    <NavLink tag={RRNavLink} to={`/trips/${authedUser.userId}`}><i className="fas fa-plane text-dark"></i></NavLink>
                  </NavItem>
                  <NavItem className="ml-2">
                    <NavLink tag={RRNavLink} to={`/profile/${authedUser.userId}`}><i className="far fa-user text-dark"></i></NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
          </div>
      );
    }
    return '';
  }
}

export default MyNavbar;
