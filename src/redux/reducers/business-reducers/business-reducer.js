import * as TYPES from '../../actions/types';

const initialState = {
  error: null,
  loading: false,
  isSuccess: false,
  isFailure: false,
  businessData: null,
  businessDetails: null,
  experiences: null,
  workers: null,
  reviews: null,
  serviceReviews: null
};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_BUSINESS_SUCCESS:
      return {
        ...state,
        loading: true,
        businessData: action.payload,
      };
    case TYPES.BUSINESS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: true,
        businessDetails: action.payload,
      };
    case TYPES.ADD_EXP_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_EXP_SUCCESS:
      return {
        ...state,
        loading: true,
        experiences: action.payload,
      };
    case TYPES.GET_WORKERS_SUCCESS:
      return {
        ...state,
        loading: true,
        workers: action.payload,
      };
    case TYPES.ADD_WORKER_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_REVIEW_SUCCESS:
      return {
        ...state,
        loading: true,
        reviews: action.payload,
      };
    case TYPES.ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: true,
    };
    case TYPES.GET_SERVICE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: true,
        serviceReviews: action.payload,
      };
    case TYPES.ADD_SERVICE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
    };
    default:
      return state;
  }
};

export default businessReducer;
