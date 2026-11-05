import { describe, it, expect } from "vitest";
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

import * as reducers from "./reducers";

describe("searchRobots", () => {
  const initialState: InitialStateProps = {
    searchField: "",
  };
  it("should return the initial state", () => {
    expect(
      reducers.searchRobotsReducer(undefined, {} as ChangeSearchFieldAction),
    ).toEqual({
      searchField: "",
    });
  });
  it("should handle CHANGE_SEARCH_FIELD action", () => {
    const action: ChangeSearchFieldAction = {
      type: CHANGE_SEARCH_FIELD,
      payload: "test",
    };
    expect(reducers.searchRobotsReducer(initialState, action)).toEqual({
      searchField: "test",
    });
  });
});

//  ROBO
describe("requestRobots", () => {
  const initialState: RequestRobotsState = {
    isPending: false,
    robots: [],
    error: null,
  };
  const mockRobots: RequestRobotsState["robots"] = [
    {
      id: 1,
      username: "Robot 1",
      email: "robot1@example.com",
      name: "Robot 1",
    },
  ];
  it("should return the initial state", () => {
    expect(
      reducers.requestRobotsReducer(undefined, {} as RequestRobotsAction),
    ).toEqual(initialState);
  });

  it("should handle REQUEST_ROBOTS_PENDING action", () => {
    const action: RequestRobotsAction = {
      type: REQUEST_ROBOTS_PENDING,
    };
    expect(reducers.requestRobotsReducer(initialState, action)).toEqual({
      ...initialState,
      isPending: true,
    });
  });
  it("should handle REQUEST_ROBOTS_SUCCESS action", () => {
    const robots: RequestRobotsState = {
      isPending: false,
      robots: mockRobots,
      error: null,
    };
    const action: RequestRobotsAction = {
      type: REQUEST_ROBOTS_SUCCESS,
      payload: robots.robots,
    };
    expect(reducers.requestRobotsReducer(initialState, action)).toEqual({
      ...initialState,
      robots: robots.robots,
    });
  });
  it("should handle REQUEST_ROBOTS_FAILED action", () => {
    const error = "Error fetching robots";
    const action: RequestRobotsAction = {
      type: REQUEST_ROBOTS_FAILED,
      payload: error,
    };
    expect(reducers.requestRobotsReducer(initialState, action)).toEqual({
      ...initialState,
      error,
    });
  });
  it("should preserve state for unknown actions", () => {
    expect(
      reducers.requestRobotsReducer(initialState, {
        type: "UNKNOWN",
      } as unknown as RequestRobotsAction),
    ).toBe(initialState);
  });
});
