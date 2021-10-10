import * as ActionTypes from '../actionTypes/ActionTypes';

export const Leaders = (state = { isLoading: true, errMess: null, leaders: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LEADERS:
      return { ...state, isLoading: false, errMess: null, leaders: action.payload };

    case ActionTypes.LEADERS_LOADING:
      //spread operator que obtiene el current value del state y hace cambios al state pero solo en el valor retornado
      //no en el valor original
      return { ...state, isLoading: true, errMess: null, leaders: [] };

    case ActionTypes.LEADERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, leaders: [] };
    default:
      return state;
  }
};
