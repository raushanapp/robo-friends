import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constant";
import type { AppDispatch } from "./store";

export const setSearchField = (text: string) => {
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: text,
  };
};

export const requestRobots = () => async (dispatch: AppDispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch((error) =>
      dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error.message }),
    );
};
