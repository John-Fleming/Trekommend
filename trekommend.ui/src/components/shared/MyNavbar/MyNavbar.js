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
    return (
      <div className="MyNavbar">
          <Navbar color="light" light>
            <NavLink tag={RRNavLink} to="/home" className="brand-header navbar-brand">Trekommend</NavLink>
              <Nav className="ml-auto flex-row" navbar>
                <NavItem className="mr-2">
                  <NavLink tag={RRNavLink} to="/profile"><i className="fas fa-search text-dark"></i></NavLink>
                </NavItem>
                {/* <NavItem className="mx-2">
                  <NavLink tag={RRNavLink} to="/profile"><i className="fas fa-plus text-dark"></i></NavLink>
                </NavItem> */}
                <NavItem className="ml-2">
                  <NavLink tag={RRNavLink} to="/profile/1"><i className="far fa-user text-dark"></i></NavLink>
                </NavItem>
              </Nav>
          </Navbar>
        </div>
    );
  }
}

export default MyNavbar;
