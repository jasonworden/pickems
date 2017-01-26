import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/Label';

export default class WeekSchedule extends Component {

  static propTypes = {
    isDisplayed: PropTypes.bool.isRequired,
    week: PropTypes.object.isRequired,
    games: PropTypes.array.isRequired,
    pickedTeamsThisWeek: PropTypes.array.isRequired,
    onTeamClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    // this.toggleWinner = this.toggleWinner.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderTeam = this.renderTeam.bind(this);
    this.isTeamPickedThisWeek = this.isTeamPickedThisWeek.bind(this);
    // this.isTeamPickedInSeason = this.isTeamPickedInSeason.bind(this);
    // this.isTeamPickLocked = this.isTeamPickLocked.bind(this);
    // this.isDisplayedWeekLocked = this.isDisplayedWeekLocked.bind(this);
  }

  isTeamPickedThisWeek(team) {
    return (
      this.props.pickedTeamsThisWeek.indexOf(team.abbreviation)
        !== -1
    );
  }

  renderTeam(team) {
    const isPicked = this.isTeamPickedThisWeek(team);
    return (
      <Button
        key={team._id}
        bsStyle={isPicked ? 'info' : 'default'}
        onClick={() => this.props.onTeamClick(team.abbreviation, !isPicked)}
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
    if (!this.props.isDisplayed) return <div></div>;

    const { week, games } = this.props;

    return (
      <div className="week-schedule">
        <h4>
          Week <strong>{week.number}</strong> games{' '}
          {week.isLocked &&
          <Label bsStyle="danger">PICKS LOCKED</Label>
          }
        </h4>
        <ul className="list-unstyled">
          {games.map(game => this.renderGame(game))}
          {!games.length &&
          <div>No games</div>
          }
        </ul>
      </div>
    );
  }
}
