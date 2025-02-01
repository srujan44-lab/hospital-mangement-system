"use client";

import { adminType, doctorType, patientType } from "@/types/user.type";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface propsType {
  children: ReactNode;
}

const authUserContext = createContext<
  (patientType & doctorType & adminType) | null
>(null);

const useAuth = () => useContext(authUserContext);

const AuthUserProvider: FC<propsType> = ({ children }): JSX.Element => {
  const [authUser, setAuthUser] = useState<
    (patientType & doctorType & adminType) | null
  >(null);

  useEffect(() => {
    const fetchAuthUser = async () => {  
      const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user`;

      const responce = await fetch(URL, {
        method: "GET",
        credentials: "include",
      });

      if (responce.status === 200) {
        const user: patientType & doctorType & adminType =
          await responce.json();

        setAuthUser(user);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <authUserContext.Provider value={authUser}>
      {children}
    </authUserContext.Provider>
  );
};

export default AuthUserProvider;
export { useAuth };
