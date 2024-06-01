import { put, takeLatest,takeEvery } from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import { endPoints } from '../../../services';

export function* appRequest() {
  yield takeLatest(types.ERRORMSG_REQUEST, error);
}

function* error(params) {
  // console.log(params, '+++++++++++++++')
  try {
    yield put({ type: types.ERRORMSG_SUCCESS, payload: params.params.errorMsg });
  } catch (error) {
  }
}
