import * as ActionTypes from '../actionTypes/ActionTypes';

export const Promotions = (state = { isLoading: true, errMess: null, promotions: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return { ...state, isLoading: false, errMess: null, promotions: action.payload };

    case ActionTypes.PROMOS_LOADING:
      //spread operator que obtiene el current value del state y hace cambios al state pero solo en el valor retornado
      //no en el valor original
      return { ...state, isLoading: true, errMess: null, promotions: [] };

    case ActionTypes.PROMOS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, promos: [] };
    default:
      return state;
  }
};
