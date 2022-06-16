import { Post } from "./Post";
import { screen, render, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

describe("post", () => {
  const initialData = {
    name: "Link",
    content: "hello world",
    photo: null,
    date: "June 14, 2022",
    id: "QIrY5G3B6inS03dCFnfL",
  };
  // let data;
  beforeAll(async () => {
    try {
      return await signInWithEmailAndPassword(auth, "test@test.com", "test123");
    } catch (err) {
      console.error(err);
    }
  });
  afterEach(() => cleanup());

  test("clicking like button increase likes displayed by 1", async () => {
    // console.log(data);
    const user = userEvent.setup();
    const { rerender } = render(
      <Provider store={store}>
        <Post
          name={initialData.name}
          content={initialData.content}
          photo={initialData.photo}
          date={initialData.date}
          id={initialData.id}
          reactions={initialData.reactions}
        />
      </Provider>
    );
    const likeButton = screen.getByRole("button", { name: "Like" });
    await user.click(likeButton);

    // const displayedReactions = await screen.findByRole("presentation");
    // const displayedReactions = await waitFor(() => screen.findByText("1"));
    const displayedReactions = screen.getByRole("presentation");
    expect(displayedReactions.textContent).toBe("1");
  });
});
