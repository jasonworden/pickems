import teams from '../../utils/teams';

const initialState = {
  all: teams
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
