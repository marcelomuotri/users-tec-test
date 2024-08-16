import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "../../features/Home";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../framework/state/store";
import "@testing-library/jest-dom";

const mockUseUsersService = vi.fn();

vi.mock("../../framework/state/services/usersService", () => ({
  useUsersService: () => mockUseUsersService(),
}));

describe("UserList Component", () => {
  it("renders the loader when loading", () => {
    mockUseUsersService.mockReturnValue({
      users: [],
      isLoading: true,
      totalPages: 0,
      error: null,
    });

    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("shows 'Failed to fetch users' when fetch failed", () => {
    mockUseUsersService.mockReturnValue({
      users: [],
      isLoading: false,
      totalPages: 0,
      error: "Failed to fetch users",
    });

    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    const noUsersText = screen.getByText(/Failed to fetch users/i);
    expect(noUsersText).toBeInTheDocument();
  });

  it("shows 'No users avaliable' when there are no users", () => {
    mockUseUsersService.mockReturnValue({
      users: [],
      isLoading: false,
      totalPages: 0,
      error: null,
    });

    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    const noUsersText = screen.getByText(/No users avaliable/i);
    expect(noUsersText).toBeInTheDocument();
  });
  it("renders user cards when users are available", () => {
    mockUseUsersService.mockReturnValue({
      users: [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          avatar: "avatar1.jpg",
        },
        {
          id: 2,
          first_name: "Jane",
          last_name: "Doe",
          email: "jane@example.com",
          avatar: "avatar2.jpg",
        },
      ],
      isLoading: false,
      totalPages: 1,
      error: null,
    });

    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    const userCard1 = screen.getByText(/john doe/i);
    const userCard2 = screen.getByText(/jane doe/i);

    expect(userCard1).toBeInTheDocument();
    expect(userCard2).toBeInTheDocument();
  });
});
