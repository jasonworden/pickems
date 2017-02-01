const PICK_WINNER = 'PICK_WINNER';
const PICK_WINNER_SUCCESS = 'PICK_WINNER_SUCCESS';
const PICK_WINNER_FAIL = 'PICK_WINNER_FAIL';

const LOAD_PICKS = 'LOAD_PICKS';
const LOAD_PICKS_SUCCESS = 'LOAD_PICKS_SUCCESS';
const LOAD_PICKS_FAIL = 'LOAD_PICKS_FAIL';

const UNLOAD_PICKS = 'UNLOAD_PICKS';

const UNPICK_WINNER = 'UNPICK_WINNER';
// const UNPICK_WINNER_SUCCESS = 'UNPICK_WINNER_SUCCESS';
// const UNPICK_WINNER_FAIL = 'UNPICK_WINNER_FAIL';

const initialState = {
  weeks: {
    1: [ 'BUF', 'GB' ],
    2: [ 'PIT' ],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: []
  },
  pickedTeams: ['BUF', 'GB', 'PIT' ],
  lockedTeams: ['BUF', 'GB'],
  loaded: false,
  loading: false,
  loadingError: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PICKS:
      return {
        ...state,
        loading: true,
        loaded: false,
        loadingError: null,
      };
    case LOAD_PICKS_SUCCESS:
      return {
        ...state,
        weeks: action.result.weeks,
        pickedTeams: action.result.pickedTeams,
        lockedTeams: action.result.lockedTeams,
        loaded: true,
        loading: false,
      };
    case LOAD_PICKS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        loadingError: true,
      };
    case UNLOAD_PICKS:
      return {
        ...state,
        loading: false,
        loaded: false,
        loadingError: null,
        weeks: {}, // may need to set to initialState.weeks
        pickedTeams: [],
        lockedTeams: [],
      };
    case PICK_WINNER_SUCCESS:
      return {
        ...state,
        weeks: {
          ...state.weeks,
          [action.result.week.number]: [
            ...state.weeks[action.result.week.number],
            action.result.nflteam.abbreviation
          ]
        },
        pickedTeams: [...state.pickedTeams, action.result.nflteam.abbreviation]
      };
    case UNPICK_WINNER:
      return {
        ...state,
        weeks: {
          ...state.weeks,
          [action.week]: [
            ...state.weeks[action.week].slice(0, state.weeks[action.week].indexOf(action.team)),
            ...state.weeks[action.week].slice(state.weeks[action.week].indexOf(action.team) + 1)
          ]
        },
        pickedTeams: [
          ...state.pickedTeams.slice(0, state.pickedTeams.indexOf(action.team)),
          ...state.pickedTeams.slice(state.pickedTeams.indexOf(action.team) + 1)
        ]
      };
    case PICK_WINNER:
    case PICK_WINNER_FAIL:
    default:
      return state;
  }
}

export function loadPicks(user) {
  return {
    types: [LOAD_PICKS, LOAD_PICKS_SUCCESS, LOAD_PICKS_FAIL],
    promise: (client) => client.post('/picks/load', user)
  };
}

export function unloadPicks() {
  return {
    type: UNLOAD_PICKS
  };
}

export function pickWinner(team, game, user) {
  return {
    types: [PICK_WINNER, PICK_WINNER_SUCCESS, PICK_WINNER_FAIL],
    promise: (client) => client.post('/picks/create', {
      data: {
        game,
        nflteam: team,
        week: game.week,
        season: game.week.season,
        user,
      }
    })
  };
}

export function unpickWinner(week, team) {
  return {
    type: UNPICK_WINNER,
    week,
    team
  };

  // return {
  //   types: [UNPICK_WINNER, UNPICK_WINNER_SUCCESS, UNPICK_WINNER_FAIL],
  //   promise: (client) => client.post('/picks/delete', {
  //     data: {
  //
  //     }
  //   })
  // };
}
