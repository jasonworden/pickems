const PICK_WINNER = 'PICK_WINNER';
const UNPICK_WINNER = 'UNPICK_WINNER';

const initialState = {
  weeks: {
    1: [ 'PHI', 'GB' ],
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
  pickedTeams: ['PHI', 'GB', 'NYJ', 'ATL'],
  lockedTeams: ['PHI', 'GB'],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case PICK_WINNER:
      return {
        ...state,
        weeks: {
          ...state.weeks,
          [action.week]: [
            ...state.weeks[action.week],
            action.team
          ]
        },
        pickedTeams: [...state.pickedTeams, action.team]
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
    default:
      return state;
  }
}

export function pickWinner(week, team) {
  return {
    type: PICK_WINNER,
    week,
    team
  };
}

export function unpickWinner(week, team) {
  return {
    type: UNPICK_WINNER,
    week,
    team
  };
}
