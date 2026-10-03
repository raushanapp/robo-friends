import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED,
} from "./constant";

export interface InitialStateProps {
  searchField: string;
}

export interface ChangeSearchFieldAction {
  type: typeof CHANGE_SEARCH_FIELD;
  payload: string;
}

export interface Robots {
  id: number;
  name: string;
  username: string;
  email: string;
}
export interface RequestRobotsState {
  isPending: boolean;
  robots: Array<Robots>;
  error: string | null;
}

export interface RequestRobotsPendingAction {
  type: typeof REQUEST_ROBOTS_PENDING;
}

export interface RequestRobotsSuccessAction {
  type: typeof REQUEST_ROBOTS_SUCCESS;
  payload: Array<Robots>;
}

export interface RequestRobotsFailedAction {
  type: typeof REQUEST_ROBOTS_FAILED;
  payload: string;
}

export type SearchAction = ChangeSearchFieldAction;
export type RequestRobotsAction =
  | RequestRobotsPendingAction
  | RequestRobotsSuccessAction
  | RequestRobotsFailedAction;

export type AppAction = SearchAction | RequestRobotsAction;
