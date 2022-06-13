import { Post } from "./Post";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import {auth} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

describe("post", () => {
  const initialData = {
    name: "Billy",
    content: "Hello world",
    photo: null,
    date: "June 8, 2022",
    id: "123",
    reactions: { likes: { likes: 1, usersReacted: [] } },
  };


  beforeAll(async () => {
    try{
      await signInWithEmailAndPassword(auth, "test@test.com", "test123");

    } catch(err) {
      console.error(err);
    }

  });
  
  test("clicking like button increase likes displayed by 1", async () => {
    render(
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
    const displayedReactions = screen.getByRole("presentation");

    await userEvent.click(likeButton);

    expect(displayedReactions).toHaveValue(2);
  });
});
