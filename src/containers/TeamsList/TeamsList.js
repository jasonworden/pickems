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
    pickedTeams: PropTypes.object.isRequired,
    allTeams: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.renderTeam = this.renderTeam.bind(this);
    this.isPickedInSeason = this.isPickedInSeason.bind(this);
  }

  isPickedInSeason(team) {
    return !!this.props.pickedTeams[team.abbreviation];
  }

  renderTeam(team) {
    return (
      <span key={team.abbreviation}>
        <Label
          style={{marginRight: 5, marginBottom: 5}}
          bsStyle={this.isPickedInSeason(team) ? 'default' : 'info'}
        >
          {team.abbreviation}
        </Label>
      </span>
    );
  }

  render() {
    const style = require('./TeamsList.scss');
    const teams = [];
    _.forEach(this.props.allTeams, team => {
      teams.push(this.renderTeam(team));
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
