import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Dishes } from './reducers/dishes';
import { Leaders } from './reducers/leaders';
import { Promotions } from './reducers/promotions';
import { Comments } from './reducers/comments';
import { initialFeedback } from './forms/forms';
import { Auth } from './reducers/auth';
import { favorites } from './reducers/favorites';
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
      auth: Auth,
      favorites,
      ...createForms({
        feedback: initialFeedback
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
