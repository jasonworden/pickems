import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { loadTeams } from 'redux/modules/teams';
import { loadSchedule } from 'redux/modules/schedule';
import { loadPicks, unloadPicks } from 'redux/modules/picks';
import { InfoBar } from 'components';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {
    logout,
    pushState: push,
    loadTeams,
    loadSchedule,
    loadPicks,
    unloadPicks,
  }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    loadTeams: PropTypes.func.isRequired,
    loadSchedule: PropTypes.func.isRequired,
    loadPicks: PropTypes.func.isRequired,
    unloadPicks: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.loadTeams();
    this.props.loadSchedule();
    if (this.props.user) {
      this.props.loadPicks(this.props.user);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // logged in... show success page:
      this.props.pushState('/loginSuccess');

      // load user data now that they've logged in:
      this.props.loadPicks(nextProps.user);
    } else if (this.props.user && !nextProps.user) {
      // logged out... return to home page:
      this.props.pushState('/');

      // unload user data now that they've logged out:
      this.props.unloadPicks();
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/widgets">
                <NavItem eventKey={2}>Widgets</NavItem>
              </LinkContainer>
              <LinkContainer to="/survey">
                <NavItem eventKey={3}>Survey</NavItem>
              </LinkContainer>
              <LinkContainer to="/pagination">
                <NavItem eventKey={4}>Pagination</NavItem>
              </LinkContainer>

              <LinkContainer to="/picks">
                <NavItem>
                  Picks
                </NavItem>
              </LinkContainer>

            </Nav>

            <Nav navbar pullRight>
              {user &&
              <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.name}</strong></p>}
              {!user &&
              <LinkContainer to="/login">
                <NavItem eventKey={6}>Log in</NavItem>
              </LinkContainer>}
              {user &&
              <LinkContainer to="/logout">
                <NavItem eventKey={7} className="logout-link" onClick={this.handleLogout}>
                  Log out
                </NavItem>
              </LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>

      </div>
    );
  }
}
