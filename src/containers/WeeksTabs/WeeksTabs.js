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
    currentWeekNum: state.schedule.currentWeek,
    displayedWeekNum: state.schedule.displayedWeek,
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
    currentWeekNum: PropTypes.number.isRequired,
    displayedWeekNum: PropTypes.number.isRequired,
    weeks: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired,

    picksByWeek: PropTypes.object.isRequired,
    pickedTeams: PropTypes.object.isRequired,
    lockedTeams: PropTypes.object.isRequired,

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
    this.isPickedInSeason = this.isPickedInSeason.bind(this);
    this.isTeamPickLocked = this.isTeamPickLocked.bind(this);
    this.renderTab = this.renderTab.bind(this);
  }

  openWeekTab(weekNum) {
    this.props.displayWeek(weekNum);
  }

  isTeamPickedInDisplayedWeek(team) {
    return (
      !!this.props.picksByWeek[this.props.displayedWeekNum] &&
      !!this.props.picksByWeek[this.props.displayedWeekNum][team.abbreviation]
    );
  }

  isPickedInSeason(team) {
    return !!this.props.pickedTeams[team.abbreviation];
  }

  isTeamPickLocked(team) {
    return !!this.props.lockedTeams[team.abbreviation];
  }

  togglePick(team, game, togglePickOn, pick) {
    if (this.props.weeks[this.props.displayedWeekNum].isLocked) {
      alert('This week is locked already');
      return;
    }
    if (this.isTeamPickLocked(team)) {
      alert('This team is in a locked pick already.');
      return;
    }
    if (togglePickOn && this.isTeamPickedInDisplayedWeek(team)) {
      return;
    }
    if (togglePickOn && _.keys(this.props.picksByWeek[this.props.displayedWeekNum]).length === 2) {
      alert('Cannot pick more than 2 teams each week');
      return;
    }
    if (togglePickOn && this.isPickedInSeason(team)) {
      alert('Team already in picks');
      return;
    }

    if (togglePickOn) {
      this.props.pickWinner(team, game, this.props.user);
    } else {
      this.props.unpickWinner(team, game, pick, this.props.user);
    }
  }

  renderTab(week) {
    return (
      <Tab eventKey={week.number} title={week.number} key={week._id}>
        <WeekSchedule
          week={week}
          isDisplayed={this.props.displayedWeekNum === week.number}
          games={this.props.games[week.number]}
          picksThisWeek={this.props.picksByWeek[week.number]}
          onTeamClick={this.togglePick}
        />
      </Tab>
    );
  }

  render() {
    // const style = require('./WeeksTabs.scss');

    return (
      <Tabs
        activeKey={this.props.displayedWeekNum}
        onSelect={this.openWeekTab}
        id="week-tabs"
      >
        {_.map(this.props.weeks, week => this.renderTab(week))}
      </Tabs>
    );
  }
}
