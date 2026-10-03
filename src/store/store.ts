import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { searchRobotsReducer, requestRobotsReducer } from "./reducers";
// import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";
import type { AppAction } from "./types";

// const logger = createLogger();

const rootReducer = combineReducers({
  searchRobots: searchRobotsReducer,
  requestRobots: requestRobotsReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  // applyMiddleware(thunk, logger),
  //  If we need a logger we add it here or uncommited the code
  applyMiddleware(thunk),
);

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = (action: AppAction) => AppAction;
