import React from "react";
import { PostForm } from "./PostForm";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("PostForm", () => {
  test("typing in textarea", async () => {
    render(<PostForm />);

    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "test");
    expect(textarea).toHaveValue("test");
  });
  test("clicking X button clears out content in textarea", async () => {
    render(<PostForm />);

    const textarea = screen.getByRole("textbox");
    const xButton = screen.getByRole("button", { name: /x/i });

    await userEvent.type(textarea, "test");
    await userEvent.click(xButton);

    expect(textarea).toHaveValue("");
  });
});
