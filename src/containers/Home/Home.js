import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <h1>{config.app.title}</h1>
            <h2>{config.app.description}</h2>

            <h4>
              <Link to="/login">
                Log in
                {' '}
                <i className="fa fa-sign-in"></i>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}
