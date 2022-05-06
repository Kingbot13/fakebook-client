import React from "react";
import { PostForm } from "./PostForm";
import { userEvent } from "@testing-library/user-event/dist/types/setup";
import { render, screen } from "@testing-library/react";


describe("PostForm", ()=> {
    test("typing in textarea", async ()=> {
        render(<PostForm />);
        const user = userEvent.setup();
        const textarea = screen.getByRole('textarea');
        await user.keyboard('new post');
        expect(textarea.textContent).toBe('new post');
    })
})