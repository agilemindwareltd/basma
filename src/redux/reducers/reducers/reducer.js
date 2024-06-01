import * as TYPES from '../../actions/types';

const initialState = {
  errorMsg:''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ERRORMSG_SUCCESS:
      return {
        ...state,
        // loading: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
