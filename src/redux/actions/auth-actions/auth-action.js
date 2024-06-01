import * as TYPES from '../types';

export const loginRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.LOGIN_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Sign up obj Action
export const signUpAction = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SIGNUP_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};


export const socialLogin = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SOCIAL_LOGIN_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
}
export const getCountry = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_COUNTRY_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
export const VerifyUser = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.VERIFYUSER_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
export const ConfirmResetPassOtp = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CONFIRMRESETPASSWORD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
export const ResendOtp = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.RESENDOTPCODE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
export const resetRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.RESET_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
export const newPassword = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.NEWPASSWORD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

