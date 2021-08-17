import * as ActionTypes from './ActionTypes';

//remmplazamos el state por un objeto que contiene el error message
//tambien contiene el dato si está cargando
export const Dishes = (state = { isLoading: true, errMess: null, dishes: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return { ...state, isLoading: false, errMess: null, dishes: action.payload };

    case ActionTypes.DISHES_LOADING:
      //spread operator que obtiene el current value del state y hace cambios al state pero solo en el valor retornado
      //no en el valor original
      return { ...state, isLoading: true, errMess: null, dishes: [] };

    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, dishes: [] };

    default:
      return state;
  }
};
