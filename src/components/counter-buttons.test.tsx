import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import CounterButtons from "./conunter-buttons";

describe("Counter Buttons component", () => {
  it("renders and matches the snapshot", () => {
    const { asFragment } = render(
      <CounterButtons color="red" count={0} handleCount={vi.fn()} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls handleCount when the button is clicked", async () => {
    const user = userEvent.setup();
    const handleCount = vi.fn();
    render(<CounterButtons color="red" count={0} handleCount={handleCount} />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(handleCount).toHaveBeenCalledTimes(1);
  });

  it("displays the correct count", () => {
    render(<CounterButtons color="red" count={5} handleCount={vi.fn()} />);
    expect(screen.getByRole("button")).toHaveTextContent("count :5");
  });

  it("applies the correct background color", () => {
    render(<CounterButtons color="red" count={0} handleCount={vi.fn()} />);

    const button = screen.getByRole("button");
    expect(getComputedStyle(button).backgroundColor).toBe("rgb(255, 0, 0)");
  });

  it("increments the count when the button is clicked", async () => {
    const user = userEvent.setup();
    const CounterWrapper = () => {
      const [count, setCount] = useState(0);
      return (
        <CounterButtons
          color="red"
          count={count}
          handleCount={() => setCount((prev) => prev + 1)}
        />
      );
    };

    render(<CounterWrapper />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("count :0");
    await user.click(button);
    expect(button).toHaveTextContent("count :1");
  });
});
