import * as TYPES from '../types';


export const _errorMsg = (params,) => {
  return {
    type: TYPES.ERRORMSG_REQUEST,
    params,
  };
};