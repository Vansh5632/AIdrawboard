export const initialState = {
  canvas: null,
  analysisResults: [],
  userPresence: [],
};

export const actionTypes = {
  SET_CANVAS: 'SET_CANVAS',
  SET_ANALYSIS_RESULTS: 'SET_ANALYSIS_RESULTS',
  SET_USER_PRESENCE: 'SET_USER_PRESENCE',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CANVAS:
      return { ...state, canvas: action.payload };
    case actionTypes.SET_ANALYSIS_RESULTS:
      return { ...state, analysisResults: action.payload };
    case actionTypes.SET_USER_PRESENCE:
      return { ...state, userPresence: action.payload };
    default:
      return state;
  }
};