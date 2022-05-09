import React from "react";
import { PostForm } from "./PostForm";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";


describe("PostForm", ()=> {
    test("typing in textarea", async ()=> {
        render(<PostForm />);
        // const user = userEvent;
        const textarea = screen.getByRole('textbox');
        await userEvent.type(textarea, 'test');
        expect(textarea).toHaveValue('test');
    })
})