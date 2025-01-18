'use client';

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/types';

const UserContext = React.createContext<{
  user: User | undefined;
  updateUser: () => void;
  logoutUser: () => void;
}>({ user: undefined, updateUser: () => {}, logoutUser: () => {} });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();

  const updateUser = () => {
    const userCookie = Cookies.get('user');
    if (!userCookie) {
      return setUser(undefined);
    }
    setUser(JSON.parse(userCookie));
  };

  const logoutUser = () => {
    Cookies.remove('user');
    setUser(undefined);
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserContext);
