import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Label from 'react-bootstrap/lib/Label';
import _ from 'lodash';

@connect(
  state => ({
    picks: state.picks.weeks
  })
)
export default class PicksByWeek extends Component {
  static propTypes = {
    picks: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.renderWeek = this.renderWeek.bind(this);
  }

  renderWeek(weekNumber, picks) {
    return (
      <li key={weekNumber}>
        <h4>
          {weekNumber}.{' '}
          {picks.map(abbrev => (
            <Label style={{marginRight: 5}}>{abbrev}</Label>
          ))}
        </h4>
      </li>
    );
  }

  render() {
    const style = require('./PicksByWeek.scss');
    const teams = [];
    _.forEach(this.props.picks, (picks, weekNum) => {
      teams.push(this.renderWeek(weekNum, picks));
    });

    return <ul className={style.teamsList + ' list-unstyled'}>{teams}</ul>;
  }
}
