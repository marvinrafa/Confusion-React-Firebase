import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import { Comments } from './comments';
import { initialFeedback } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';

export const ConfigureStore = () => {
  //configure store recibe enhancers como el segundo parametro por eso ponemos los middlewares como segundo parametro
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      ...createForms({
        feedback: initialFeedback
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
