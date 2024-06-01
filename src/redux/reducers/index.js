import { combineReducers } from 'redux';

import loginReducer from './auth-reducers/auth-reducer';
import Reducer from './reducers/reducer';
import businessReducer from './business-reducers/business-reducer';
import baseReducer from './base-reducer/base-reducer';

let rootReducer;
export default rootReducer = combineReducers(
  Object.assign({
    login: loginReducer,
    base: baseReducer,
    business: businessReducer,
    app: Reducer,
  }),
);
