import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, it, afterEach, vi } from "vitest";
import { Provider, useSelector as useReduxSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../../features/Login";
import store from "../../framework/state/store";
import "@testing-library/jest-dom";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

const useSelector = vi.mocked(useReduxSelector);

describe("Login Component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the login form", () => {
    useSelector.mockReturnValue({ loading: false, email: null, error: null });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("renders the loader when loading", () => {
    useSelector.mockReturnValue({ loading: true });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const loader = screen.getByTestId("loader");

    expect(loader).toBeInTheDocument();
  });
});
