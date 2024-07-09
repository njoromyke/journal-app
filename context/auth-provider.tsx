import { getStorageItemAsync, useStorageState } from "@/hooks/useStorageState";
import { getData, postData } from "@/utils/api";
import config from "@/utils/config/global-config";
import { ReactNode, useEffect, useMemo, useState } from "react";
import AuthContext from "./auth-context";
import { User } from "./types/user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getToken = async () => {
    setLoading(true);
    const token = await getStorageItemAsync(config.STORAGE_KEY);
    setToken(token);

    setLoading(false);
  };

  const fetchUser = async () => {
    setLoading(true);

    const url = "/api/users/user/me";
    const { success, data } = await getData(url, {});

    if (success) {
      setUser(data.user);
      setToken(data.user?.token);
    } else {
      setToken(null);
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const values = useMemo(() => {
    return { loading, token, user };
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
