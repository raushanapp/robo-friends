import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./card";

const props = {
  name: "Test Name",
  email: "test@example.com",
  id: 1,
};
const renderCardComponent = () => render(<Card {...props} />);

describe("Card Component", () => {
  it("should render the Card Component with snapshorts", () => {
    expect(renderCardComponent()).toMatchSnapshot();
  });
  it("should render the Card Component with correct content", () => {
    renderCardComponent();
    expect(
      screen.getByRole("heading", { name: "Name: Test Name" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Email: test@example.com")).toBeInTheDocument();
  });
});
