import { createContext } from "react";
import { User } from "./types/user";

const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  loading: boolean;
}>({ token: null, user: null, loading: false });

export default AuthContext;
