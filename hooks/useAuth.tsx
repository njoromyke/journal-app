import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { User } from "@/context/types/user";
import { getData } from "@/utils/api";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const url = "/api/users/user/me";
    const { success, data } = await getData(url, {});

    if (success) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user };
};

export default useAuth;
