import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Button from 'react-bootstrap/lib/Button';
import teams from '../../utils/teams';
import * as picksActions from '../../redux/modules/picks';

@connect(
  state => ({
    currentWeek: state.schedule.currentWeek,
    schedule: state.schedule.weeks,

    picksByWeek: state.picks.weeks,
    pickedTeams: state.picks.pickedTeams
  }),
  picksActions
)
export default class PicksHome extends Component {

  static propTypes = {
    actions: PropTypes.object,
    currentWeek: PropTypes.number.isRequired,
    schedule: PropTypes.object.isRequired,
    totalWeeks: PropTypes.number.isRequired,
    picksByWeek: PropTypes.object.isRequired,
    pickedTeams: PropTypes.array.isRequired,
    pickWinner: PropTypes.func.isRequired,
    unpickWinner: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.openWeekTab = this.openWeekTab.bind(this);
    this.toggleWinner = this.toggleWinner.bind(this);
    this.renderMatchup = this.renderMatchup.bind(this);
    this.renderMatchupTeam = this.renderMatchupTeam.bind(this);
    this.isTeamPickedInDisplayedWeek = this.isTeamPickedInDisplayedWeek.bind(this);
    this.isTeamPickedInSeason = this.isTeamPickedInSeason.bind(this);
    this.state = {
      displayedWeek: props.currentWeek
    };
  }

  openWeekTab(weekNum) {
    event.preventDefault();
    this.setState({displayedWeek: weekNum});
  }

  isTeamPickedInDisplayedWeek(teamAbbrev) {
    return this.props.picksByWeek[this.state.displayedWeek].indexOf(teamAbbrev) !== -1;
  }

  isTeamPickedInSeason(teamAbbrev) {
    return this.props.pickedTeams.indexOf(teamAbbrev) !== -1;
  }

  toggleWinner(teamAbbrev, pickTeam) {
    if (pickTeam && this.isTeamPickedInDisplayedWeek(teamAbbrev)) {
      return;
    }
    if (pickTeam && this.props.picksByWeek[this.state.displayedWeek].length === 2) {
      alert('Cannot pick more than 2 teams each week');
      return;
    }
    if (pickTeam && this.isTeamPickedInSeason(teamAbbrev)) {
      alert('Team already in picks');
      return;
    }

    if (pickTeam) {
      this.props.pickWinner(this.state.displayedWeek, teamAbbrev);
    } else {
      this.props.unpickWinner(this.state.displayedWeek, teamAbbrev);
    }
  }

  renderMatchupTeam(teamAbbrev) {
    const longTeamName = teams[teamAbbrev];
    const isPicked = this.isTeamPickedInDisplayedWeek(teamAbbrev);
    return (
      <Button
        key={teamAbbrev}
        bsStyle={isPicked ? 'info' : 'default'}
        onClick={() => this.toggleWinner(teamAbbrev, !isPicked)}
      >
        {longTeamName}
      </Button>
    );
  }

  renderMatchup(awayAbbrev, homeAbbrev) {
    return (
      <li key={`${awayAbbrev}@${homeAbbrev}`}>
        {this.renderMatchupTeam(awayAbbrev)}
        <span>{' @ '}</span>
        {this.renderMatchupTeam(homeAbbrev)}
      </li>
    );
  }

  render() {
    // const style = require('./WeeksTabs.scss');
    const weekTabs = [];
    for (let weekNum = 1; weekNum <= this.props.totalWeeks; ++weekNum) {
      weekTabs.push(
        <Tab eventKey={weekNum} title={weekNum}>
          <h5>Week {weekNum} games</h5>
          <ul className="list-unstyled">
            {this.props.schedule[weekNum].map(
              matchup => this.renderMatchup(matchup[0], matchup[1])
            )}
          </ul>
        </Tab>
      );
    }

    return (
      <Tabs
        activeKey={this.state.displayedWeek}
        onSelect={this.openWeekTab}
        id="week-tabs"
      >
        {weekTabs}
      </Tabs>
    );
  }
}
