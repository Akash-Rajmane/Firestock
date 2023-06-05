import { createContext, useContext, useMemo, useState } from "react";
import FirebaseAuth from "../handlers/auth";

const { signIn, signOut, getCurrentUser } = FirebaseAuth;

export const Context = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const logIn = () => signIn().then(setCurrentUser);

  const logOut = () => signOut().then(() => setCurrentUser(null));

  const authenticate = () => {
    getCurrentUser().then(setCurrentUser);
  };

  const value = useMemo(() => {
    return { logIn, logOut, currentUser, authenticate };
  }, [logIn, logOut, currentUser, authenticate]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
  return useContext(Context);
};

export default AuthProvider;
