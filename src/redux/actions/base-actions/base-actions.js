import * as TYPES from '../types';

export const getProfileRequest = (cbSuccess, cbFailure, token) => {
  return {
    type: TYPES.GET_PROFILE_REQUEST,
    cbSuccess,
    cbFailure,
    token
  };
};
export const getSettingsRequest = (cbSuccess, cbFailure,) => {
  return {
    type: TYPES.GET_SETTINGS_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

export const getIWasHereRequest = (cbSuccess, cbFailure, token) => {
  return {
    type: TYPES.GET_IWASHERE_REQUEST,
    cbSuccess,
    cbFailure,
    token
  };
};

export const getRatingRequest = (userId, token, cbSuccess, cbFailure,) => {
  return {
    type: TYPES.GET_RATING_REQUEST,
    userId,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const updateProfileRequest = (cbSuccess, cbFailure, data, token) => {
  return {
    type: TYPES.UPDATE_PROFILE_REQUEST,
    cbSuccess,
    cbFailure,
    data,
    token
  };
};
