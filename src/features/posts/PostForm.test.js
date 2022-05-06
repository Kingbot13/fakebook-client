import React from "react";
import { PostForm } from "./PostForm";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";


describe("PostForm", ()=> {
    test("typing in textarea", ()=> {
        render(<PostForm />);
        const user = userEvent.setup();
        const textarea = screen.getByRole('textbox');
        user.type(textarea, 'new post');
        expect(textarea.value).toBe('new post');
    })
})