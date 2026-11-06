import { describe, it, expect, vi, beforeEach } from "vitest";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import type { Middleware, Dispatch, AnyAction } from "redux";
import * as action from "./actions";
//  Note for the asynchronous testing libray --> nock
import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constant";
import type { Robots } from "./types";
import { apiCall } from "../api/api";

vi.mock("../api/api", () => ({
  apiCall: vi.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middlewares = [thunk] as unknown as Middleware<object, any, Dispatch<AnyAction>>[]; 

const mockStore = configureMockStore(middlewares);

const mockRobots: Robots[] = [
  {
    id: 1,
    name: "Robot One",
    username: "robotone",
    email: "robot1@example.com",
  },
  {
    id: 2,
    name: "Robot Two",
    username: "robottwo",
    email: "robot2@example.com",
  },
];

describe("Search Robots Action", () => {
  it("should create an action to search robots", () => {
    const text = "test";
    const expectedAction = {
      type: CHANGE_SEARCH_FIELD,
      payload: text,
    };
    expect(action.setSearchField(text)).toEqual(expectedAction);
  });
});

describe("Request Robots Action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("handle request robots pending", async () => {
    const expectedAction = {
      type: REQUEST_ROBOTS_PENDING,
    };
    const store = mockStore({});

    store.dispatch(action.requestRobots() as unknown as AnyAction);
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);
  });
  it("handle request robots success", async () => {
    vi.mocked(apiCall).mockResolvedValue(mockRobots);
    const store = mockStore({});
    await store.dispatch(action.requestRobots() as unknown as AnyAction);
    const actions = store.getActions();
    expect(actions[0].type).toEqual(REQUEST_ROBOTS_PENDING);
    expect(actions[1]).toEqual({
      type: REQUEST_ROBOTS_SUCCESS,
      payload: mockRobots,
    });
  });
  it("handle request robots failed", async () => {
    const errorMessage = "Failed to fetch robots";
    vi.mocked(apiCall).mockRejectedValue(new Error(errorMessage));
    const store = mockStore({});
    await store.dispatch(action.requestRobots() as unknown as AnyAction);
    const actions = store.getActions();
    expect(actions[0].type).toEqual(REQUEST_ROBOTS_PENDING);
    expect(actions[1]).toEqual({
      type: REQUEST_ROBOTS_FAILED,
      payload: errorMessage,
    });
  });
});
