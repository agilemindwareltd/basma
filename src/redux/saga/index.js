import { fork } from 'redux-saga/effects';


import {loginRequest} from './auth-saga/auth-saga';
import {appRequest} from './saga/saga';
import {businessRequest} from './business-saga/business-saga';
import { baseRequest } from './base-saga/base-saga';

export function* rootSaga() {
  yield fork(appRequest);
  yield fork(loginRequest);
  yield fork(baseRequest);
  yield fork(businessRequest);
}
