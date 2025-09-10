import { render, screen } from "@testing-library/react";
import App from "App";
import "@testing-library/jest-dom";

test("renders the root app without fail", () => {
  render(<App />);
  expect(screen.getByText(/Lucas Képelemző Szoftver/i)).toBeInTheDocument();
});
