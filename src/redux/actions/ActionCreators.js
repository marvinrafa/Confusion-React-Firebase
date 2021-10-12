//iMPORTAMOS TODAS LAS ACTION TYPES
import * as ActionTypes from '../actionTypes/ActionTypes';
import { auth, firestore, fireauth, firebasestore } from '../../firebase/firebase';

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, comment) => (dispatch) => {
  //Validamos que este logueado
  if (!auth.currentUser) {
    console.log('No user logged in!');
    return;
  }

  //En vez de fectch, usamos firestore para consultar y pasamos el nombre de la colleccion
  return (
    firestore
      .collection('comments')
      //Add agrega una coleccion, y le pasamos los campos
      .add({
        author: {
          _id: auth.currentUser.uid,
          firstname: auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email
        },
        dish: dishId,
        rating: rating,
        comment: comment,
        //Los campos de fecha
        createdAt: firebasestore.FieldValue.serverTimestamp(),
        updatedAt: firebasestore.FieldValue.serverTimestamp()
      })
      //Leugo, nos da la referencia al documento creado
      .then((docRef) => {
        firestore
          .collection('comments')
          //Obteniendo el documento (fetching)
          .doc(docRef.id)
          //get retorna el documento y nos da en el callback en doc
          .get()
          .then((doc) => {
            if (doc.exists) {
              //En firebase, el id y la data vienen separadas, por tanto,
              //tenemos que juntarlos en un solo json porque asi funciona nuestra app
              const data = doc.data();
              const _id = doc.id;
              //Juntando el id y la data en un solo doc
              let comment = { _id, ...data };
              //Dispatch the redux action
              dispatch(addComment(comment));
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          });
      })
      .catch((error) => {
        console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: ' + error.message);
      })
  );
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return (
    firestore
      .collection('dishes')
      .get()
      //Despues de hacer el get de la coleccion,
      //retorna un snapshot
      .then((snapshot) => {
        let dishes = [];
        //recorriendo la coleccion
        snapshot.forEach((doc) => {
          const data = doc.data();
          const _id = doc.id;
          //Armando los documentos en uno solo, ya que vienen separados
          dishes.push({ _id, ...data });
        });
        return dishes;
      })
      .then((dishes) => dispatch(addDishes(dishes)))
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
  return firestore
    .collection('comments')
    .get()
    .then((snapshot) => {
      let comments = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const _id = doc.id;
        comments.push({ _id, ...data });
      });
      return comments;
    })
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

  return firestore
    .collection('promotions')
    .get()
    .then((snapshot) => {
      let promos = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const _id = doc.id;
        promos.push({ _id, ...data });
      });
      return promos;
    })
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

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return firestore
    .collection('leaders')
    .get()
    .then((snapshot) => {
      let leaders = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const _id = doc.id;
        leaders.push({ _id, ...data });
      });
      return leaders;
    })
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
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
  return firestore
    .collection('feedback')
    .add(feedback)
    .then((response) => {
      console.log('Feedback', response);
      alert('Thank you for your feedback!');
    })
    .catch((error) => {
      console.log('Feedback', error.message);
      alert('Your feedback could not be posted\nError: ' + error.message);
    });
};

export const requestLogin = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST
  };
};

export const requestRegister = () => {
  return {
    type: ActionTypes.REGISTER_REQUEST
  };
};

export const receiveLogin = (user) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    user
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message
  };
};

export const registerUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestRegister(creds));

  //The auth imported from firebase
  return auth
    .createUserWithEmailAndPassword(creds.username, creds.password)
    .then(() => {
      //When you login, the auth firebase contains a currentUserProperty
      var user = auth.currentUser;
      //Storing user information in  localstorage
      //We dont track the token because that is a task of firebase module
      localStorage.setItem('user', JSON.stringify(user));
      // Dispatch the success action
      dispatch(fetchFavorites());
      dispatch(receiveLogin(user));
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  //The auth imported from firebase
  return auth
    .signInWithEmailAndPassword(creds.username, creds.password)
    .then(() => {
      //When you login, the auth firebase contains a currentUserProperty
      var user = auth.currentUser;
      //Storing user information in  localstorage
      //We dont track the token because that is a task of firebase module
      localStorage.setItem('user', JSON.stringify(user));
      // Dispatch the success action
      dispatch(fetchFavorites());
      dispatch(receiveLogin(user));
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
  auth
    //Metodo para cerrar sesion usando el firebase npm module
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
  localStorage.removeItem('user');
  dispatch(favoritesFailed('Error 401: Unauthorized'));
  dispatch(receiveLogout());
};

export const postFavorite = (dishId) => (dispatch) => {
  if (!auth.currentUser) {
    console.log('No user logged in!');
    return;
  }

  return (
    firestore
      .collection('favorites')
      //POST ITEM
      .add({
        //The auth.currentUser object contains the uid of the user logged
        user: auth.currentUser.uid,
        //We just going to save the dishId
        dish: dishId
      })
      .then((docRef) => {
        firestore
          .collection('favorites')
          .doc(docRef.id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch(fetchFavorites());
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          });
      })
      .catch((error) => dispatch(favoritesFailed(error.message)))
  );
};

export const deleteFavorite = (dishId) => (dispatch) => {
  if (!auth.currentUser) {
    console.log('No user logged in!');
    return;
  }

  var user = auth.currentUser;

  return (
    firestore
      .collection('favorites')
      //obteniendo documento que tenga el usuario y el id del plato
      .where('user', '==', user.uid)
      .where('dish', '==', dishId)
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        //Recorriendo la respuesta (solo deberia ser un documento)
        snapshot.forEach((doc) => {
          console.log(doc.id);
          firestore
            .collection('favorites')
            .doc(doc.id)
            //Borrando ese documento encontrado en la consulta anterior
            .delete()
            .then(() => {
              dispatch(fetchFavorites());
            });
        });
      })
      .catch((error) => dispatch(favoritesFailed(error.message)))
  );
};

export const fetchFavorites = () => (dispatch) => {
  if (!auth.currentUser) {
    console.log('No user logged in!');
    return;
  }

  var user = auth.currentUser;

  dispatch(favoritesLoading(true));

  return firestore
    .collection('favorites')

    .where('user', '==', user.uid)
    .get()
    .then((snapshot) => {
      let favorites = { user: user, dishes: [] };
      snapshot.forEach((doc) => {
        const data = doc.data();
        favorites.dishes.push(data.dish);
      });
      console.log(favorites);
      return favorites;
    })
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

export const googleLogin = () => (dispatch) => {
  const provider = new fireauth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      // Dispatch the success action
      dispatch(fetchFavorites());
      dispatch(receiveLogin(user));
    })
    .catch((error) => {
      dispatch(loginError(error.message));
    });
};
