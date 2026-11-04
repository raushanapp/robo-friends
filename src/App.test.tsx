import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

const mockRobots = [
  {
    id: 1,
    name: "John",
    email: "john@test.com",
  },
  {
    id: 2,
    name: "David",
    email: "david@test.com",
  },
];

const mockState = {
  searchRobots: {
    searchField: "",
  },
  requestRobots: {
    robots: mockRobots,
    isPending: false,
    error: "",
  },
};
const mockErrorState = {
  searchRobots: {
    searchField: "",
  },
  requestRobots: {
    robots: [],
    isPending: false,
    error: "Something went wrong",
  },
};

const renderApp = (initialState = mockState) => {
  const mockStore = legacy_createStore(
    (state = initialState) => state,
    applyMiddleware(thunk),
  );
  return render(
    <Provider store={mockStore}>
      <App />
    </Provider>,
  );
};

describe("App component", () => {
  it("should render the App component", () => {
    renderApp();
    expect(screen).toMatchSnapshot();
  });

  it("should show error message", () => {
    renderApp(mockErrorState);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
