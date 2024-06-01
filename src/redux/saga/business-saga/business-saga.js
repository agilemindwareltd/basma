import { put, takeLatest } from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import { endPoints } from '../../../services';

export function* businessRequest() {
  yield takeLatest(types.GET_BUSINESS_REQUEST, getBusinsses);
  yield takeLatest(types.BUSINESS_DETAILS_REQUEST, getBusinessDetails);
  yield takeLatest(types.GET_EXP_REQUEST, getExperiences);
  yield takeLatest(types.ADD_EXP_REQUEST, addExperience);
  yield takeLatest(types.GET_WORKERS_REQUEST, getWorkers);
  yield takeLatest(types.ADD_WORKER_REQUEST, addWorker);
  yield takeLatest(types.GET_REVIEW_REQUEST, getRatings);
  yield takeLatest(types.ADD_REVIEW_REQUEST, addRating);
  yield takeLatest(types.GET_SERVICE_REVIEW_REQUEST, getServiceRatings);
  yield takeLatest(types.ADD_SERVICE_REVIEW_REQUEST, addServiceRating);
  yield takeLatest(types.REGISTER_COMPANY_REQUEST, registerCompany);
  yield takeLatest(types.UPDATE_COMPANY_REQUEST, updateCompanyProfile);
  yield takeLatest(types.ADD_COMPANY_SERVICES_REQUEST, addCompanyservices);
  yield takeLatest(types.GET_USER_COMPANY_REQUEST, getUserCompanyRequest);
  yield takeLatest(types.DELETE_SERVICE_REQUEST, deleteService);
}

function* getBusinsses(params) {
  try {
    let response = yield Api.getAxios(
      endPoints.businessApiEndpoint(-1, 10, 1),
      params.params,
    );
    if (response.Success) {
      yield put({
        type: types.GET_BUSINESS_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}

function* getBusinessDetails(params) {
  try {
    let response = yield Api.getAxios(
      endPoints.bsnsDetailsApiEndpoint(params.companyId, 10, 1),
      params.params,
    );
    if (response.Success) {
      yield put({
        type: types.BUSINESS_DETAILS_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}

function* getExperiences(params) {
  try {
    let response = yield Api.getAxios1(
      endPoints.getExpApiEndpoint(params.companyId, 10, 1),
      params,
    );
    if (response.Success) {
      yield put({
        type: types.GET_EXP_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}

function* addExperience(params, token) {
  try {
    let response = yield Api.postMulitpart(
      endPoints.addExp,
      params.params,
      params.token,
    );
    if (response.Success) {
      yield put({
        type: types.ADD_EXP_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}

function* getWorkers(params) {
  try {
    let response = yield Api.getAxios1(
      endPoints.getWorkersEndpoint(params.companyId, 10, 1),
      params,
    );
    if (response.Success) {
      yield put({
        type: types.GET_WORKERS_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}

function* addWorker(params, token) {
  try {
    let response = yield Api.postMulitpart(
      endPoints.addWorker,
      params.params,
      params.token,
    );
    if (response.Success) {
      yield put({
        type: types.ADD_WORKER_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}

function* getRatings(params) {
  try {
    let response = yield Api.getAxios1(
      endPoints.getRatingsEndpoint(params.companyId, 10, 1),
      params,
    );
    if (response.Success) {
      yield put({
        type: types.GET_REVIEW_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}


function* addRating(params, token) {
  try {
    let response = yield Api.postMulitpart1(
      endPoints.addReview,
      params.params,
      params.token,
    );
    if (response.Success) {
      yield put({
        type: types.ADD_REVIEW_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}

function* getServiceRatings(params) {
  try {
    let response = yield Api.getAxios1(
      endPoints.getServiceRatingsEndpoint(params.serviceId, 10, 1),
      params,
    );
    if (response.Success) {
      yield put({
        type: types.GET_SERVICE_REVIEW_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}


function* addServiceRating(params, token) {
  try {
    let response = yield Api.postMulitpart1(
      endPoints.addServiceReview,
      params.params,
      params.token,
    );
    if (response.Success) {
      yield put({
        type: types.ADD_SERVICE_REVIEW_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}
function* registerCompany(params,) {
  try {
    let response = yield Api.postMulitpart1(endPoints.CompanyCreateAccount, params.data, params.token,);
    if (response.Success) {
      yield put({
        type: types.REGISTER_COMPANY_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response.Response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}
function* addCompanyservices(params,) {
  try {
    let response = yield Api.postMulitpart1(endPoints.addCompanyservices, params.data, params.token,);
    if (response.Success) {
      yield put({
        type: types.ADD_COMPANY_SERVICES_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response.Response);
    } else {
      params.cbFailure(response.data);
    }
    console.log(response, 'responseresponseresponseresponse', params)
  } catch (error) {
    console.log(error.response, 'responseresponseresponseresponse', error)
    // params.cbFailure(error?.response);
  }
}
function* updateCompanyProfile(params,) {
  try {
    let response = yield Api.postMulitpart1(endPoints.updateCompanyProfileEndPoint, params.data, params.token,);

    if (response.Success) {
      yield put({
        type: types.UPDATE_COMPANY_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response.Response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}
function* getUserCompanyRequest(params,) {
  try {
    let response = yield Api.axiosGet1(endPoints.getCompanyData, params);
    if (response.Success) {
      yield put({
        type: types.GET_USER_COMPANY_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response.Response);
    } else {
      params.cbFailure(response);
    }
  } catch (error) {
    params.cbFailure(error?.response);
  }
}
function* deleteService(params,) {
  try {
    let response = yield Api.postMulitpart1(endPoints.deleteService, params.data, params.token);
    if (response.Success) {
      yield put({
        type: types.GET_USER_COMPANY_SUCCESS,
        payload: response.Response,
      });
      params.cbSuccess(response.Response);
    } else {
      params.cbFailure(response);
    }
    // console.log(response, ';lkjhgasrtyuiop[];lkjbv', params)
  } catch (error) {
    console.log(error, ';lkjhgasrtyuiop[];lkjbv')
    // params.cbFailure(error?.response);
  }
}