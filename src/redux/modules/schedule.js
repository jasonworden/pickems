const LOAD_SCHEDULE = 'LOAD_SCHEDULE';
const LOAD_SCHEDULE_SUCCESS = 'LOAD_SCHEDULE_SUCCESS';
const LOAD_SCHEDULE_FAIL = 'LOAD_SCHEDULE_FAIL';

const DISPLAY_WEEK = 'DISPLAY_WEEK';

const initialState = {
  currentWeek: 0,
  displayedWeek: 0,
  weeks: {},
  loaded: false,
  loading: true,
  loadingError: null,
  games: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SCHEDULE:
      return {
        ...state,
        initialState
      };
    case LOAD_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currentWeek: action.result.currentWeek,
        displayedWeek: state.displayedWeek > 0 ? // set to current if not set yet
          state.displayedWeek : action.result.currentWeek,
        weeks: action.result.weeks,
        games: action.result.games
      };
    case LOAD_SCHEDULE_FAIL:
      return {
        ...state,
        loading: false,
        loadingError: action.error
      };
    case DISPLAY_WEEK:
      return {
        ...state,
        displayedWeek: action.week
      };
    default:
      return state;
  }
}

export function loadSchedule() {
  return {
    types: [LOAD_SCHEDULE, LOAD_SCHEDULE_SUCCESS, LOAD_SCHEDULE_FAIL],
    promise: (client) => client.get('/schedule')
  };
}

export function displayWeek(weekNum) {
  return {
    type: DISPLAY_WEEK,
    week: weekNum
  };
}
