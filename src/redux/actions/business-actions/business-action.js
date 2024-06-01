import * as TYPES from '../types';

export const businessRequest = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_BUSINESS_REQUEST,
    cbSuccess,
    cbFailure,
  };
};
export const companyAddServices = (cbSuccess, cbFailure, data, token) => {
  return {
    type: TYPES.ADD_COMPANY_SERVICES_REQUEST,
    data,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const bsnsDetailsRequest = (companyId, cbSuccess, cbFailure) => {
  return {
    type: TYPES.BUSINESS_DETAILS_REQUEST,
    companyId,
    cbSuccess,
    cbFailure,
  };
};

export const getExpRequest = (companyId, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_EXP_REQUEST,
    companyId,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const addExpRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_EXP_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const getWorkersRequest = (companyId, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_WORKERS_REQUEST,
    companyId,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const joinWorkRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_WORKER_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const getRatingsRequest = (companyId, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_REVIEW_REQUEST,
    companyId,
    token,
    cbSuccess,
    cbFailure,
  };
};


export const addRatingRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_REVIEW_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const getServiceRatingsRequest = (serviceId, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_SERVICE_REVIEW_REQUEST,
    serviceId,
    token,
    cbSuccess,
    cbFailure,
  };
};


export const addServiceRatingRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_SERVICE_REVIEW_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};
export const registerCompany = (cbSuccess, cbFailure, data, token) => {
  return {
    type: TYPES.REGISTER_COMPANY_REQUEST,
    cbSuccess,
    cbFailure,
    data,
    token,
  };
};
export const updateCompanyProfile = (cbSuccess, cbFailure, data, token) => {
  return {
    type: TYPES.UPDATE_COMPANY_REQUEST,
    cbSuccess,
    cbFailure,
    data,
    token,
  };
};
export const getUserCompanyRequest = (cbSuccess, cbFailure, token) => {
  return {
    type: TYPES.GET_USER_COMPANY_REQUEST,
    cbSuccess,
    cbFailure,
    token,
  };
};
export const deleteServiceRequest = (cbSuccess, cbFailure,data, token) => {
  return {
    type: TYPES.DELETE_SERVICE_REQUEST,
    cbSuccess,
    data,
    cbFailure,
    token,
  };
};