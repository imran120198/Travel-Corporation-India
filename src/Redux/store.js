import { applyMiddleware, compose, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "./reducer";

const createCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  reducer,
  createCompose(applyMiddleware(thunk))
);

export default store;
