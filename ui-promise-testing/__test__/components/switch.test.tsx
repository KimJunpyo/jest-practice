import SwitchServer from "@/components/Switch";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("switch test", () => {
  it("render default status as off", () => {
    render(<SwitchServer />);
    expect(screen.getByRole("test")).toHaveTextContent(/실패/i);
  });
  it("click input, and check it turned on", async () => {
    render(<SwitchServer />);
    fireEvent.click(screen.getByRole("switch"));
    await waitFor(
      () => {
        expect(screen.getByRole("test")).toHaveTextContent(/성공/i);
      },
      { timeout: 2000 }
    );
  });
});
