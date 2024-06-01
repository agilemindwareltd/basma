import * as TYPES from '../../actions/types';

const initialState = {
  error: null,
  loading: false,
  isSuccess: false,
  isFailure: false,
  userData: null,
  getCountry: [],
  verifyUser:[],
  resendOtp:'',
  resetRequest:'',
  confirmResetPassotp:'',
  newPassword:'',
  // dev basma
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: true,
        userData: action.payload,
      };
    case TYPES.LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case TYPES.GET_COUNTRY_SUCCESS:
      return {
        ...state,
        // loading: true,
        getCountry: action.payload,
      };
    case TYPES.VERIFYUSER_SUCCESS:
      return {
        ...state,
        // loading: true,
        verifyUser: action.payload,
      };
    case TYPES.RESENDOTPCODE_SUCCESS:
      return {
        ...state,
        // loading: true,
        resendOtp: action.payload,
      };
    case TYPES.RESET_SUCCESS:
      return {
        ...state,
        // loading: true,
        resetRequest: action.payload,
      };
    case TYPES.CONFIRMRESETPASSWORD_SUCCESS:
      return {
        ...state,
        // loading: true,
        confirmResetPassotp: action.payload,
      };
    case TYPES.NEWPASSWORD_SUCCESS:
      return {
        ...state,
        // loading: true,
        newPassword: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
