import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MainPage from "./main-page";

const defaultProps = {
  searchField: "",
  robots: [],
  isPending: false,
  error: null,
  setSearchField: () => {},
  onRequestRobots: () => {},
};
const isLoading = {
  ...defaultProps,
  isPending: true,
};

const renderMainPage = (initialState = defaultProps) =>
  render(<MainPage {...initialState} />);

describe("MainPage", () => {
  it("render Main page Snapshot", () => {
    renderMainPage();
    expect(screen).toMatchSnapshot();
  });
  it("should show loading", () => {
    renderMainPage(isLoading);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
