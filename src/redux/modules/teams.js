// import teams from '../../utils/teams';

const LOAD_TEAMS = 'LOAD_TEAMS';
const LOAD_TEAMS_SUCCESS = 'LOAD_TEAMS_SUCCESS';
const LOAD_TEAMS_FAIL = 'LOAD_TEAMS_FAIL';

const initialState = {
  all: {},
  loaded: false,
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_TEAMS:
      return {
        ...state,
        loading: true
      };
    case LOAD_TEAMS_SUCCESS:
      debugger;
      return {
        ...state,
        loading: false,
        loaded: true,
        all: action.result
      };
    case LOAD_TEAMS_FAIL:
      debugger;
      return {
        ...state,
        loading: false,
        loaded: false,
        teamsError: action.error,
        all: {}
      };
    default:
      return state;
  }
}

export function getTeams() {
  return {
    types: [LOAD_TEAMS, LOAD_TEAMS_SUCCESS, LOAD_TEAMS_FAIL],
    promise: (client) => client.get('/teams')
  };
}
