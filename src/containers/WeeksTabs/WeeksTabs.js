import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Button from 'react-bootstrap/lib/Button';
import * as picksActions from '../../redux/modules/picks';
import * as scheduleActions from '../../redux/modules/schedule';

@connect(
  state => ({
    currentWeek: state.schedule.currentWeek,
    displayedWeek: state.schedule.displayedWeek,
    weeks: state.schedule.weeks,
    games: state.schedule.games,

    picksByWeek: state.picks.weeks,
    pickedTeams: state.picks.pickedTeams
  }),
  {
    ...picksActions,
    ...scheduleActions
  }
)
export default class WeeksTabs extends Component {

  static propTypes = {
    actions: PropTypes.object,
    currentWeek: PropTypes.number.isRequired,
    displayedWeek: PropTypes.number.isRequired,
    weeks: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired,

    picksByWeek: PropTypes.object.isRequired,
    pickedTeams: PropTypes.array.isRequired,

    pickWinner: PropTypes.func.isRequired,
    unpickWinner: PropTypes.func.isRequired,

    displayWeek: PropTypes.func.isRequired,
    // loadSchedule: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.openWeekTab = this.openWeekTab.bind(this);
    this.toggleWinner = this.toggleWinner.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderTeam = this.renderTeam.bind(this);
    this.isTeamPickedInDisplayedWeek = this.isTeamPickedInDisplayedWeek.bind(this);
    this.isTeamPickedInSeason = this.isTeamPickedInSeason.bind(this);
  }

  openWeekTab(weekNum) {
    this.props.displayWeek(weekNum);
  }

  isTeamPickedInDisplayedWeek(team) {
    return (
      this.props.picksByWeek[this.props.displayedWeek].indexOf(team.abbreviation)
        !== -1
    );
  }

  isTeamPickedInSeason(teamAbbrev) {
    return this.props.pickedTeams.indexOf(teamAbbrev) !== -1;
  }

  toggleWinner(teamAbbrev, pickTeam) {
    if (pickTeam && this.isTeamPickedInDisplayedWeek(teamAbbrev)) {
      return;
    }
    if (pickTeam && this.props.picksByWeek[this.props.displayedWeek].length === 2) {
      alert('Cannot pick more than 2 teams each week');
      return;
    }
    if (pickTeam && this.isTeamPickedInSeason(teamAbbrev)) {
      alert('Team already in picks');
      return;
    }

    if (pickTeam) {
      this.props.pickWinner(this.props.displayedWeek, teamAbbrev);
    } else {
      this.props.unpickWinner(this.props.displayedWeek, teamAbbrev);
    }
  }

  renderTeam(team) {
    const isPicked = this.isTeamPickedInDisplayedWeek(team);
    return (
      <Button
        key={team._id}
        bsStyle={isPicked ? 'info' : 'default'}
        onClick={() => this.toggleWinner(team.abbreviation, !isPicked)}
      >
        {team.location + ' ' + team.name}
      </Button>
    );
  }

  renderGame(game) {
    return (
      <li key={game._id}>
        {this.renderTeam(game.awayTeam)}
        <span>{' @ '}</span>
        {this.renderTeam(game.homeTeam)}
      </li>
    );
  }

  render() {
    // const style = require('./WeeksTabs.scss');
    const weekTabs = [];
    _.forEach(this.props.weeks, week => {
      weekTabs.push(
        <Tab eventKey={week.number} title={week.number} key={week.number}>
          <h5>Week <strong>{week.number}</strong> games</h5>
          <ul className="list-unstyled">
            {this.props.games[week.number].map(
              game => this.renderGame(game)
            )}
          </ul>
        </Tab>
      );
    });

    return (
      <Tabs
        activeKey={this.props.displayedWeek}
        onSelect={this.openWeekTab}
        id="week-tabs"
      >
        {weekTabs}
      </Tabs>
    );
  }
}
