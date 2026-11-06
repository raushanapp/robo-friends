import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constant";
import type { AppDispatch } from "./store";
import { apiCall } from "../api/api";

export const setSearchField = (text: string) => {
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: text,
  };
};

export const requestRobots = () => async (dispatch: AppDispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });

  try {
    const robots = await apiCall("https://jsonplaceholder.typicode.com/users");
    dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: robots });
  } catch (error) {
    dispatch({
      type: REQUEST_ROBOTS_FAILED,
      payload:
        error instanceof Error ? error.message : "Failed to load robots.",
    });
  }
};
