import React from "react";
import { Newsfeed } from "./Newsfeed";
import { PostForm } from "../features/posts/PostForm";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";

describe("Newsfeed", () => {
  test("toggle PostForm on when PostButton is clicked", async () => {
    render(
      <Provider store={store}>
        <Newsfeed />;
      </Provider>
    );
    const toggleButton = screen.getByRole("button", {
      name: "What's on your mind?",
    });

    await userEvent.click(toggleButton);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("toggle PostForm off when x button is clicked", async () => {
    render(
      <Provider store={store}>
        <Newsfeed />
      </Provider>
    );
    const toggleButton = screen.getByRole("button", {
      name: "What's on your mind?",
    });
    await userEvent.click(toggleButton);
    const xButton = screen.getByRole("button", { name: /x/i });
    await userEvent.click(xButton);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
