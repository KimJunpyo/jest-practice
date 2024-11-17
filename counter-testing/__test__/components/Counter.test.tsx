import MyCounter from "@/components/Counter";
import {fireEvent, render, screen} from "@testing-library/react";

describe("카운트 컴포넌트에 대한 테스팅", () => {
  let unmount: () => void;
  beforeEach(() => {
    const renderer = render(<MyCounter />);
    unmount = renderer.unmount;
  });
  it("기본값이 0인가?", () => {
    expect(screen.getByRole("count").textContent).toBe("0");
  });
  it("초기값이 잘 적용되는가?", () => {
    unmount();
    render(<MyCounter initValue={1} />);
    expect(screen.getByRole("count").textContent).toBe("1");
  });
  it("+ 클릭시, 값이 1 증가하는가?", () => {
    const count = screen.getByRole("count");
    const increaseButton = screen.getByRole("button", {name: "+"});
    fireEvent.click(increaseButton);
    expect(count.textContent).toBe("1");
  });
});
