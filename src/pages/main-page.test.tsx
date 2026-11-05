import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MainPage, { type MainPageProps } from "./main-page";
import type { Robots } from "../store/types";

let defaultMockProps: MainPageProps;
let isLoading: MainPageProps;

const mockRobots = [
  { id: 1, name: "John", email: "john@test.com" },
  { id: 2, name: "David", email: "david@test.com" },
  { id: 3, name: "Alice", email: "alice@test.com" },
] as Robots[];
beforeEach(() => {
  defaultMockProps = {
    searchField: "",
    robots: mockRobots,
    isPending: false,
    error: null,
    setSearchField: vi.fn(),
    onRequestRobots: vi.fn(),
  };
  isLoading = {
    ...defaultMockProps,
    isPending: true,
  };
});

const renderMainPage = (initialState = defaultMockProps) =>
  render(<MainPage {...initialState} />);

describe("MainPage", () => {
  it("render Main page without crashing", () => {
    renderMainPage();
    expect(screen).toMatchSnapshot();
  });
  it("should show loading", () => {
    renderMainPage(isLoading);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("should call onRequestRobots when component mounts", () => {
    renderMainPage();
    expect(defaultMockProps.onRequestRobots).toHaveBeenCalledTimes(1);
  });

  it("should call setSearchField when user types in search box", () => {
    renderMainPage();
    const searchInput = screen.getByRole("searchbox", {
      name: /search robots/i,
    });
    fireEvent.change(searchInput, { target: { value: "John" } });
    expect(defaultMockProps.setSearchField).toHaveBeenCalledWith("John");
    expect(searchInput).not.toBeNull();
  });

  it("should filter robots based on searchField", () => {
    renderMainPage({
      ...defaultMockProps,
      searchField: "John",
    });
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.queryByText(/David/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Alice/)).not.toBeInTheDocument();
  });
  it("should filter robots without case sensitivity", () => {
    renderMainPage({
      ...defaultMockProps,
      searchField: "JOHN",
    });

    expect(screen.getByText(/John/)).toBeInTheDocument();
  });

  it("should show all robots when searchField is empty", () => {
    renderMainPage();

    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/David/)).toBeInTheDocument();
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
  });

  it("should show no robots when search does not match", () => {
    renderMainPage({
      ...defaultMockProps,
      searchField: "XYZ",
    });

    expect(screen.queryByText(/John/)).not.toBeInTheDocument();
    expect(screen.queryByText(/David/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Alice/)).not.toBeInTheDocument();
  });
});
