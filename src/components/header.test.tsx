import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./header";

const renderHeader = () => render(<Header />);

describe("Header with counter component", () => {
  it("should render the header component", () => {
    renderHeader();
    expect(screen).toMatchSnapshot();
  });

  it("should render the header text", () => {
    renderHeader();
    expect(screen.getByText(/robofriends/i)).toBeInTheDocument();
  });
  it("should render the Heading ", () => {
    renderHeader();
    expect(
      screen.getByRole("heading", { name: "RoboFriends" }),
    ).toBeInTheDocument();
  });
  it("should initially display count as 0", () => {
    renderHeader();
    expect(screen.getByText(/count\s*:\s*0/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("count :0");
  });
  it("should increment count when button is clicked", () => {
    renderHeader();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText(/count\s*:\s*1/i)).toBeInTheDocument();
    expect(screen.getByText("count :1")).toBeInTheDocument();
  });
  it("should increment count multiple times", () => {
    renderHeader();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.getByText(/count\s*:\s*3/i)).toBeInTheDocument();
    expect(screen.getByText("count :3")).toBeInTheDocument();
  });
});
