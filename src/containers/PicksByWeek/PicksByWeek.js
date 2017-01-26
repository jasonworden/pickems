import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Label from 'react-bootstrap/lib/Label';
import Badge from 'react-bootstrap/lib/Badge';
import _ from 'lodash';

@connect(
  state => ({
    picks: state.picks.weeks,
    weeks: state.schedule.weeks,
  })
)
export default class PicksByWeek extends Component {
  static propTypes = {
    picks: PropTypes.object.isRequired,
    weeks: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.renderWeek = this.renderWeek.bind(this);
  }

  renderWeek(week, picks) {
    const key = week._id;
    if (!week.arePicksAllowed) {
      return (
        <li key={key}>
          {week.number}.{' '}
          <Label>NO PICKS THIS WEEK</Label>
        </li>
      );
    }

    return (
      <li key={key}>
        <h4>
          {week.number}.{' '}
          {picks.map(abbrev => (
            <Label style={{marginRight: 5}}>
              {week.isLocked &&
              <Badge><i className="fa fa-lock" /></Badge>
              }
              {abbrev}
            </Label>
          ))}
        </h4>
      </li>
    );
  }

  render() {
    const style = require('./PicksByWeek.scss');
    const teams = [];
    _.forEach(this.props.weeks, week => {
      const picks = this.props.picks[week.number];
      teams.push(this.renderWeek(week, picks));
    });

    return (
      <div className="picks-by-week">
        <h5 style={{fontWeight: 'bold', textTransform: 'uppercase'}}>Your picks by week</h5>
        <ul className={style.teamsList + ' list-unstyled'}>{teams}</ul>
      </div>
    );
  }
}
