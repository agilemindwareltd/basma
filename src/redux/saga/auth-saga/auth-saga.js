import { put, takeLatest } from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import { endPoints } from '../../../services';

export function* loginRequest() {
  yield takeLatest(types.LOGIN_REQUEST_REQUEST, login);
  yield takeLatest(types.SIGNUP_REQUEST, signup);
  yield takeLatest(types.SOCIAL_LOGIN_REQUEST, socialLoginReq);
  yield takeLatest(types.GET_COUNTRY_REQUEST, getCountry);
  yield takeLatest(types.VERIFYUSER_REQUEST, VerifyUser);
  yield takeLatest(types.RESENDOTPCODE_REQUEST, resendOtp);
  yield takeLatest(types.RESET_REQUEST, resetRequest);
  yield takeLatest(types.CONFIRMRESETPASSWORD_REQUEST, ConfirmResetPassOtp);
  yield takeLatest(types.NEWPASSWORD_REQUEST, newPassword);
}


function* getCountry(params) {
  try {
    let response = yield Api.getAxios(endPoints.getcountry, params.params);
    if (response.Success) {
      yield put({
        type: types.GET_COUNTRY_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response, 'getCountry Success');
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response?.data?.ErrorMessage);
  }
}
function* VerifyUser(params) {
  try {
    let response = yield Api.postAxios(endPoints.verifyUser, params.params);
    if (response.Success) {
      yield put({
        type: types.LOGIN_REQUEST_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess('Signed in success');
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response?.data?.ErrorMessage);
  }
}
function* ConfirmResetPassOtp(params) {
  try {
    let response = yield Api.postAxios(endPoints.confirmResetPassOtp, params.params);
    if (response.Success) {
      yield put({
        type: types.CONFIRMRESETPASSWORD_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response?.data?.ErrorMessage);
  }
}
function* newPassword(params) {
  try {
    let response = yield Api.postAxios(endPoints.newPassword, params.params);
    if (response.Success) {
      yield put({
        type: types.NEWPASSWORD_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response?.data?.errors?.ConfirmedPassword);
  }
}

function* login(params) {
  try {
    let response = yield Api.postAxios(endPoints.login, params.params);
    if (response.Success) {
      yield put({
        type: types.LOGIN_REQUEST_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess('Signed in success');
    }
    else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response?.data?.ErrorMessage);
  }
}

function* signup(params) {
  try {
    let response = yield Api.postAxios(endPoints.signup, params.params);
    if (response.Success) {
      // yield put({
      //   type: types.LOGIN_REQUEST_SUCCESS,
      //   payload: response.Response,
      // });
      params.cbSuccess('signup in success');
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response?.data?.ErrorMessage || 'Validation failed');
  }
}


function* socialLoginReq(params) {
  try {
    let response = yield Api.postAxios(endPoints.socialLogin, params.params);
    if (response.Success) {
      yield put({
        type: types.LOGIN_REQUEST_SUCCESS,
        payload: response.Response,
        socialLogin: true,
      });
      params.cbSuccess(response?.data?.message || 'social Signed in success');
    }

  } catch (error) {
    params.cbFailure(error?.response?.data?.ErrorMessage || 'Validation failed');
  }
}

function* resendOtp(params) {
  try {
    let response = yield Api.postAxios(endPoints.resendOtp, params.params);
    if (response.Success) {
      yield put({
        type: types.RESENDOTPCODE_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response?.data?.ErrorMessage);
  }
}
function* resetRequest(params) {
  try {
    let response = yield Api.postAxios(endPoints.resetRequest, params.params);
    if (response.Success) {
      yield put({
        type: types.RESET_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response?.data?.ErrorMessage);
  }
}