import _ from 'lodash';

const PICK_WINNER = 'PICK_WINNER';
const PICK_WINNER_SUCCESS = 'PICK_WINNER_SUCCESS';
const PICK_WINNER_FAIL = 'PICK_WINNER_FAIL';

const LOAD_PICKS = 'LOAD_PICKS';
const LOAD_PICKS_SUCCESS = 'LOAD_PICKS_SUCCESS';
const LOAD_PICKS_FAIL = 'LOAD_PICKS_FAIL';

const UNLOAD_PICKS = 'UNLOAD_PICKS';

const UNPICK_WINNER = 'UNPICK_WINNER';
const UNPICK_WINNER_SUCCESS = 'UNPICK_WINNER_SUCCESS';
const UNPICK_WINNER_FAIL = 'UNPICK_WINNER_FAIL';

const initialState = {
  weeks: {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
    12: {},
    13: {},
    14: {},
    15: {},
    16: {}
  },
  pickedTeams: {},
  lockedTeams: {},
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
          [action.result.pick.week.number]: {
            ...state.weeks[action.result.pick.week.number],
            [action.result.pick.nflteam.abbreviation]: action.result.pick
          }
        },
        pickedTeams: {
          ...state.pickedTeams,
          [action.result.pick.nflteam.abbreviation]: action.result.pick.nflteam
        }
      };
    case UNPICK_WINNER_SUCCESS:
      return {
        ...state,
        weeks: {
          ...state.weeks,
          [action.result.weekNum]: _.omitBy({
            ...state.weeks[action.result.weekNum],
            [action.result.nflteam.abbreviation]: undefined
          }, _.isUndefined)
        },
        pickedTeams: _.omitBy({
          ...state.pickedTeams,
          [action.result.nflteam.abbreviation]: undefined
        }, _.isUndefined)
      };
    case PICK_WINNER:
    case PICK_WINNER_FAIL:
    case UNPICK_WINNER:
    case UNPICK_WINNER_FAIL:
    default:
      return state;
  }
}

export function loadPicks(user) {
  return {
    types: [LOAD_PICKS, LOAD_PICKS_SUCCESS, LOAD_PICKS_FAIL],
    promise: (client) => client.post('/picks/load', {
      data: {
        user,
      }
    })
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

export function unpickWinner(team, game, pick, user) {
  return {
    types: [UNPICK_WINNER, UNPICK_WINNER_SUCCESS, UNPICK_WINNER_FAIL],
    promise: (client) => client.post('/picks/remove', {
      data: {
        pick,
        nflteam: team,
        weekNum: game.week.number,
        user,
      }
    })
  };
}
