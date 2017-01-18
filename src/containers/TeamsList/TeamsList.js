import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Label from 'react-bootstrap/lib/Label';
import _ from 'lodash';

@connect(
  state => ({
    pickedTeams: state.picks.pickedTeams,
    allTeams: state.teams.all,
  })
)
export default class PickedTeams extends Component {
  static propTypes = {
    pickedTeams: PropTypes.array.isRequired,
    allTeams: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.renderTeam = this.renderTeam.bind(this);
  }

  renderTeam(abbrev) {
    return (
      <span key={abbrev}>
        <Label
          style={{marginRight: 5, marginBottom: 5}}
          bsStyle={this.props.pickedTeams.indexOf(abbrev) !== -1 ? 'default' : 'info'}
        >
          {abbrev}
        </Label>
      </span>
    );
  }

  render() {
    const style = require('./TeamsList.scss');
    const teams = [];
    _.forEach(this.props.allTeams, (fullName, abbrev) => {
      teams.push(this.renderTeam(abbrev));
      teams.push(' ');
    });

    return (
      <div className={style.teamsList}>
        <h6>Teams left to pick</h6>
        {teams}
      </div>
    );
  }
}
