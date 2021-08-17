//importamos los actiontypes
import * as ActionTypes from './ActionTypes';

export const Comments = (
  state = {
    errMess: null,
    comments: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, isLoading: false, errMess: null, comments: action.payload };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, comments: [] };
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      //pushes el elemento al state
      //siempre el estado original es inmutable, entonces siempre se mantiene
      //se genera otro a partir del anterior (como una nueva version sin afectar al anterior-)
      return { ...state, comments: state.comments.concat(comment) };
    default:
      return state;
  }
};
