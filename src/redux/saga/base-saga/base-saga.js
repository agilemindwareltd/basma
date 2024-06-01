import { put, takeLatest } from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import { endPoints } from '../../../services';

export function* baseRequest() {
    yield takeLatest(types.GET_PROFILE_REQUEST, getProfile);
    yield takeLatest(types.GET_IWASHERE_REQUEST, getIwasHere);
    yield takeLatest(types.GET_RATING_REQUEST, getRating);
    yield takeLatest(types.UPDATE_PROFILE_REQUEST, updateProfile);
    yield takeLatest(types.GET_SETTINGS_REQUEST, getSettings);
}
function* getIwasHere(params) {
    try {
        let response = yield Api.getAxios1(endPoints.getIwasHere, params,);
        if (response.Success) {
            yield put({
                type: types.GET_IWASHERE_SUCCESS,
                payload: response.Response,
            });
            params.cbSuccess(response.Response);
        } else {
            params.cbFailure(response.Response);
        }
    } catch (error) {

        params.cbFailure(error?.response);
    }
}
function* getProfile(params) {
    try {
        let response = yield Api.getAxios1(endPoints.getProfile, params,);
        if (response.Success) {
            yield put({
                type: types.GET_PROFILE_SUCCESS,
                payload: response.Response,
            });
            params.cbSuccess(response.Response);
        } else {
            params.cbFailure(response.Response);
        }
    } catch (error) {

        params.cbFailure(error?.response);
    }
}
function* getRating(params) {
    try {
        let response = yield Api.getAxios1(endPoints.getUserRatingsEndpoint(params.userId, 10, 1), params);
        if (response.Success) {
            yield put({
                type: types.GET_RATING_SUCCESS,
                payload: response.Response,
            });
            params.cbSuccess(response.Response);
        } else {
            params.cbFailure(response.Response);
        }
    } catch (error) {
        params.cbFailure(error?.response);
    }
}
function* updateProfile(params) {
    try {
        let response = yield Api.postMulitpart1(endPoints.updateProfileEndpoint, params.data, params.token,);
        if (response.Success) {
            yield put({
                type: types.UPDATE_PROFILE_SUCCESS,
                payload: response.Response,
            });
            params.cbSuccess(response.Response);
        } else {
            params.cbFailure(response.data);
        }
    } catch (error) {
        params.cbFailure(error?.response);
    }
}
function* getSettings(params) {
    try {
        let response = yield Api.axiosGet(endPoints.getSetting,);
        if (response.Success) {
            yield put({
                type: types.GET_SETTINGS_SUCCESS,
                payload: response.Response,
            });
            params.cbSuccess(response.Response);
        } else {
            params.cbFailure(response.data);
        }
    } catch (error) {
        params.cbFailure(error?.response);
    }
}