// import teams from '../../utils/teams';

const initialState = {
  currentWeek: 1,
  totalWeeks: 17,
  weeks: {
    1: [
      [ 'ARI', 'GB' ],
      [ 'CIN', 'CAR' ],
      [ 'DAL', 'NE' ],
      [ 'SF', 'OAK' ],
      [ 'HOU', 'TEN' ],
      [ 'LAR', 'LAC' ],
      [ 'NYG', 'PHI' ]
    ],
    2: [
      [ 'ARI', 'PIT' ],
      [ 'GB', 'ATL' ],
      [ 'NYJ', 'PHI' ]
    ],
    3: [
      [ 'GB', 'DET' ],
      [ 'DAL', 'PIT' ],
      [ 'BUF', 'PHI' ]
    ]
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
