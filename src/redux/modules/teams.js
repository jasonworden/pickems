const LOAD_TEAMS = 'LOAD_TEAMS';
const LOAD_TEAMS_SUCCESS = 'LOAD_TEAMS_SUCCESS';
const LOAD_TEAMS_FAIL = 'LOAD_TEAMS_FAIL';

const initialState = {
  all: {},
  loaded: false,
  loading: true,
  loadingError: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_TEAMS:
      return {
        ...state,
        initialState
      };
    case LOAD_TEAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        all: action.result
      };
    case LOAD_TEAMS_FAIL:
      return {
        ...state,
        loading: false,
        loadingError: action.error,
      };
    default:
      return state;
  }
}

export function loadTeams() {
  return {
    types: [LOAD_TEAMS, LOAD_TEAMS_SUCCESS, LOAD_TEAMS_FAIL],
    promise: (client) => client.get('/teams')
  };
}
