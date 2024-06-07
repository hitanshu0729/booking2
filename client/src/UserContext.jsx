import axios from "axios";
import React, { useEffect, useState } from "react";
/* This code snippet is creating a UserContext using the `createContext` function from React. It then
defines a `UserContextProvider` component that takes in children as props. Within the
`UserContextProvider` component, it initializes a state variable `user` using `React.useState` hook
with an initial value of `null`. It then renders the `UserContext.Provider` component with the value
of `{ user, setUser }` provided to its consumers. This allows components nested within the
`UserContextProvider` to access and update the `user` state using the `UserContext`. */
import { createContext } from "react";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setready] = useState(false);
  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data);
          setready(true);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          setUser(null);
        });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
