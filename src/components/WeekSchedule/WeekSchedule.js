import React, {Component, PropTypes} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/Label';
import Badge from 'react-bootstrap/lib/Badge';

export default class WeekSchedule extends Component {

  static propTypes = {
    isDisplayed: PropTypes.bool.isRequired,
    week: PropTypes.object.isRequired,
    games: PropTypes.array.isRequired,
    picksThisWeek: PropTypes.object, // not required: undefined for week 17
    onTeamClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    // this.toggleWinner = this.toggleWinner.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderTeam = this.renderTeam.bind(this);
    this.getPickForThisWeek = this.getPickForThisWeek.bind(this);
    // this.isTeamPickedInSeason = this.isTeamPickedInSeason.bind(this);
    // this.isTeamPickLocked = this.isTeamPickLocked.bind(this);
    // this.isDisplayedWeekLocked = this.isDisplayedWeekLocked.bind(this);
  }

  getPickForThisWeek(team) {
    if (!this.props.picksThisWeek) {
      return null;
    }

    const pick = this.props.picksThisWeek[team.abbreviation];
    return (typeof pick !== 'undefined') ?
      pick : null;
  }

  renderTeam(team, game) {
    const matchingPick = this.getPickForThisWeek(team);
    const isPicked = !!matchingPick;
    const isWinner = team._id === game.winner;
    const isLoser = team._id === game.loser;
    const isPickCorrect = game.isDecided && isPicked && isWinner;
    const isPickIncorrect = game.isDecided && isPicked && !isWinner;

    let buttonStyle = 'default';
    if (isPickCorrect) {
      buttonStyle = 'success';
    } else if (isPickIncorrect) {
      buttonStyle = 'danger';
    } else if (isPicked) {
      buttonStyle = 'info';
    }

    return (
      <Button
        key={team._id}
        bsStyle={buttonStyle}
        onClick={() => this.props.onTeamClick(team, game, !isPicked, matchingPick)}
      >
        {team.location + ' ' + team.name + ' '}
        {isWinner && <Badge>W</Badge>}
        {isLoser && <Badge>L</Badge>}
      </Button>
    );
  }

  renderGame(game) {
    return (
      <li key={game._id}>
        {this.renderTeam(game.awayTeam, game)}
        <span>{' @ '}</span>
        {this.renderTeam(game.homeTeam, game)}
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
