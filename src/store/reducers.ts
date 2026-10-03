import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constant";
import type {
  ChangeSearchFieldAction,
  InitialStateProps,
  RequestRobotsAction,
  RequestRobotsState,
} from "./types";

type SearchAction = ChangeSearchFieldAction;

const initialState: InitialStateProps = {
  searchField: "",
};

export const searchRobotsReducer = (
  state: InitialStateProps = initialState,
  action: SearchAction,
): InitialStateProps => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD: {
      // return Object.assign({}, state, { search: action.payload });
      return {
        ...state,
        searchField: action.payload,
      };
    }
    default:
      return state;
  }
};

// Request Robots Reducer
const initialRobotsState: RequestRobotsState = {
  isPending: false,
  robots: [],
  error: null,
};

export const requestRobotsReducer = (
  state: RequestRobotsState = initialRobotsState,
  action: RequestRobotsAction,
): RequestRobotsState => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING: {
      return Object.assign({}, state, { isPending: true });
    }
    case REQUEST_ROBOTS_SUCCESS: {
      return Object.assign({}, state, {
        robots: action.payload,
        isPending: false,
      });
    }
    case REQUEST_ROBOTS_FAILED: {
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    }
    default:
      return state;
  }
};
