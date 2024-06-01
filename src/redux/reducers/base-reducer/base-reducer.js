import * as TYPES from '../../actions/types';

const initialState = {
  getProfile: [],
  getIwasHere: [],
  getRating: []
};

const baseReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        getProfile: action.payload
      };
    case TYPES.GET_IWASHERE_SUCCESS:
      return {
        ...state,
        getIwasHere: action.payload
      };
    case TYPES.GET_RATING_SUCCESS:
      return {
        ...state,
        getRating: action.payload
      };
    case TYPES.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        getProfile: action.payload
      };
    default:
      return state;
  }
};

export default baseReducer;
