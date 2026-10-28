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

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`Failed to load robots: ${response.status}`);
    }

    const robots = await response.json();
    dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: robots });
  } catch (error) {
    dispatch({
      type: REQUEST_ROBOTS_FAILED,
      payload: error instanceof Error ? error.message : "Failed to load robots.",
    });
  }
};
