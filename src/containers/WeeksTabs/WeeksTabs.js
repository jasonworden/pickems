import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import {WeekSchedule} from '../../components';
import * as picksActions from '../../redux/modules/picks';
import * as scheduleActions from '../../redux/modules/schedule';

@connect(
  state => ({
    user: state.auth.user,
    currentWeek: state.schedule.currentWeek,
    displayedWeek: state.schedule.displayedWeek,
    weeks: state.schedule.weeks,
    games: state.schedule.games,

    picksByWeek: state.picks.weeks,
    pickedTeams: state.picks.pickedTeams,
    lockedTeams: state.picks.lockedTeams,
  }),
  {
    ...picksActions,
    ...scheduleActions,
  }
)
export default class WeeksTabs extends Component {

  static propTypes = {
    user: PropTypes.object,
    actions: PropTypes.object,
    currentWeek: PropTypes.number.isRequired,
    displayedWeek: PropTypes.number.isRequired,
    weeks: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired,

    picksByWeek: PropTypes.object.isRequired,
    pickedTeams: PropTypes.array.isRequired,
    lockedTeams: PropTypes.array.isRequired,

    pickWinner: PropTypes.func.isRequired,
    unpickWinner: PropTypes.func.isRequired,

    displayWeek: PropTypes.func.isRequired,
    // loadSchedule: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.openWeekTab = this.openWeekTab.bind(this);
    this.togglePick = this.togglePick.bind(this);
    this.isTeamPickedInDisplayedWeek = this.isTeamPickedInDisplayedWeek.bind(this);
    this.isTeamPickedInSeason = this.isTeamPickedInSeason.bind(this);
    this.isTeamPickLocked = this.isTeamPickLocked.bind(this);
    this.isDisplayedWeekLocked = this.isDisplayedWeekLocked.bind(this);
    this.renderTab = this.renderTab.bind(this);
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
    return (this.props.pickedTeams.indexOf(teamAbbrev) !== -1);
  }

  isTeamPickLocked(teamAbbrev) {
    return (this.props.lockedTeams.indexOf(teamAbbrev) !== -1);
  }

  isDisplayedWeekLocked() {
    return (this.props.displayedWeek < this.props.currentWeek);
  }

  togglePick(team, game, togglePickOn) {
    if (this.isDisplayedWeekLocked()) {
      alert('This week is locked already');
      return;
    }
    if (this.isTeamPickLocked(team.abbreviation)) {
      alert('This team is in a locked pick already.');
      return;
    }
    if (togglePickOn && this.isTeamPickedInDisplayedWeek(team.abbreviation)) {
      return;
    }
    if (togglePickOn && this.props.picksByWeek[this.props.displayedWeek].length === 2) {
      alert('Cannot pick more than 2 teams each week');
      return;
    }
    if (togglePickOn && this.isTeamPickedInSeason(team.abbreviation)) {
      alert('Team already in picks');
      return;
    }

    if (togglePickOn) {
      this.props.pickWinner(team, game, this.props.user);
    } else {
      this.props.unpickWinner(this.props.displayedWeek, team.abbreviation);
    }
  }

  renderTab(week) {
    return (
      <Tab eventKey={week.number} title={week.number} key={week._id}>
        <WeekSchedule
          week={week}
          isDisplayed={this.props.displayedWeek === week.number}
          games={this.props.games[week.number]}
          pickedTeamsThisWeek={this.props.picksByWeek[week.number]}
          onTeamClick={this.togglePick}
        />
      </Tab>
    );
  }

  render() {
    // const style = require('./WeeksTabs.scss');

    return (
      <Tabs
        activeKey={this.props.displayedWeek}
        onSelect={this.openWeekTab}
        id="week-tabs"
      >
        {_.map(this.props.weeks, week => this.renderTab(week))}
      </Tabs>
    );
  }
}
