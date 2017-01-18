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

  renderTeam(team) {
    return (
      <span key={team.abbreviation}>
        <Label
          style={{marginRight: 5, marginBottom: 5}}
          bsStyle={this.props.pickedTeams.indexOf(team.abbreviation) !== -1 ? 'default' : 'info'}
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
