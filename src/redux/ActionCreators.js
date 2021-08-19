//iMPORTAMOS TODAS LAS ACTION TYPES
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  //la data que necesita ser carried por la accion
  payload: comment
});

export const postComment = (dishId, rating, comment) => (dispatch) => {
  const newComment = {
    dish: dishId,
    rating: rating,
    comment: comment
  };
  console.log('Comment ', newComment);

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer
    },
    credentials: 'same-origin'
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log('Post comments ', error.message);
      alert('Your comment could not be posted\nError: ' + error.message);
    });
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  //Se reemplazara con una llamada async al server
  return (
    fetch(baseUrl + 'dishes')
      .then(
        (response) => {
          if (response.ok) {
            //El siguiente response se pasa al siguiente then del codigo ( asi funcionan las promises.
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            //El siguiente throw se pasa al catch de la promesa
            throw error;
          }
        },
        //Cuando no se recibe nada del server:
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((dishes) => dispatch(addDishes(dishes)))
      //Disparamos la accion de dishesFailed porque se ha encontrado un error usando dispatch
      //Así maneja redux el state y las actions
      .catch((error) => dispatch(dishesFailed(error.message)))
  );
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const fetchComments = () => (dispatch) => {
  //Llamada al server con funciones then que manejan el async
  return fetch(baseUrl + 'comments')
    .then(
      (response) => {
        if (response.ok) {
          //El siguiente response se pasa al siguiente then del codigo ( asi funcionan las promises.
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          //El siguiente throw se pasa al catch de la promesa
          throw error;
        }
      },
      //Cuando no se recibe nada del server:
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  //Se reemplazara con una llamada async al server
  return fetch(baseUrl + 'promotions')
    .then(
      (response) => {
        if (response.ok) {
          //El siguiente response se pasa al siguiente then del codigo ( asi funcionan las promises.
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          //El siguiente throw se pasa al catch de la promesa
          throw error;
        }
      },
      //Cuando no se recibe nada del server:
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

// LEADERS NETHODS
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));

  //Se reemplazara con una llamada async al server
  return (
    fetch(baseUrl + 'leaders')
      .then(
        (response) => {
          if (response.ok) {
            //El siguiente response se pasa al siguiente then del codigo ( asi funcionan las promises.
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            //El siguiente throw se pasa al catch de la promesa
            throw error;
          }
        },
        //Cuando no se recibe nada del server:
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((leaders) => dispatch(addLeaders(leaders)))
      //Disparamos la accion de dishesFailed porque se ha encontrado un error usando dispatch
      //Así maneja redux el state y las actions
      .catch((error) => dispatch(leadersFailed(error.message)))
  );
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

export const postFeedback = (feedback) => (dispatch) => {
  feedback.date = new Date().toISOString();

  return fetch(baseUrl + 'feedback', {
    method: 'POST',
    body: JSON.stringify(feedback),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addFeedback(response)))
    .catch((error) => {
      console.log('post feedback', error.message);
      alert('Your feedback could not be posted\nError: ' + error.message);
    });
};

export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback
});

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  };
};

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message
  };
};

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  //Calling to the login endpoint
  return fetch(baseUrl + 'users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        //Guardando el token en el local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('creds', JSON.stringify(creds));
        // Dispatch the success action
        // When the user login, we fetch the favorites.
        dispatch(fetchFavorites());
        //We dispatch the receive login
        dispatch(receiveLogin(response));
      } else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  dispatch(favoritesFailed('Error 401: Unauthorized'));
  dispatch(receiveLogout());
};

export const postFavorite = (dishId) => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/' + dishId, {
    method: 'POST',
    body: JSON.stringify({ _id: dishId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer
    },
    credentials: 'same-origin'
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((favorites) => {
      console.log('Favorite Added', favorites);
      dispatch(addFavorites(favorites));
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const deleteFavorite = (dishId) => (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites/' + dishId, {
    method: 'DELETE',
    headers: {
      Authorization: bearer
    },
    credentials: 'same-origin'
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((favorites) => {
      console.log('Favorite Deleted', favorites);
      dispatch(addFavorites(favorites));
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
  dispatch(favoritesLoading(true));

  const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(baseUrl + 'favorites', {
    headers: {
      Authorization: bearer
    }
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((favorites) => dispatch(addFavorites(favorites)))
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errmess
});

export const addFavorites = (favorites) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: favorites
});
