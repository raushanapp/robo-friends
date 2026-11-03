import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardList from "./card-list";

const mockRobos = [
  {
    id: 1,
    name: "Test Name 1",
    email: "test1@example.com",
    username: "testuser1",
  },
  {
    id: 2,
    name: "Test Name 2",
    email: "test2@example.com",
    username: "testuser2",
  },
];

const cardListComponent = () => render(<CardList robos={mockRobos} />);

describe("CardList", () => {
  it("take snapshort for CardList", () => {
    cardListComponent();
    expect(screen).toMatchSnapshot();
  });
  it("renders a list of cards", () => {
    cardListComponent();
    expect(screen.getByText("Name: Test Name 1")).toBeInTheDocument();
    expect(screen.getByText("Email: test1@example.com")).toBeInTheDocument();
    expect(screen.getByText("Name: Test Name 2")).toBeInTheDocument();
    expect(screen.getByText("Email: test2@example.com")).toBeInTheDocument();
  });
  it("could test when name are not rendered", () => {
    const emptyRobos: typeof mockRobos = [];
    render(<CardList robos={emptyRobos} />);
    expect(screen.queryByText("Name:")).not.toBeInTheDocument();
  });
});
