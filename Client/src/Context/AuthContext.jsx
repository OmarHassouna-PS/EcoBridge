import { createContext, useEffect, useState } from 'react';
import VerifyToken from '../Utils/Api/VerifyToken';
import { useReducer } from 'react';

export const Context = createContext();

const AuthContext = ({ children }) => {
  const [isLog, setIsLog] = useState();
  const [userInfo, setUserInfo] = useState();
  const [forceUpdateValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [values, setValues] = useState();

  const getUserInfo = async () => {
    const user = await VerifyToken();

    if (user) {
      setIsLog(true);
      setUserInfo(user);
    } else {
      setIsLog(false);
      setUserInfo(undefined);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [isLog]);

  useEffect(() => {
    setValues({
      logIn: { isLog, setIsLog },
      UserInfo: userInfo,
      setUserInfo: setUserInfo,
      forceUpdate : forceUpdate,
      forceUpdateValue : forceUpdateValue
    });
  }, [isLog, userInfo, forceUpdateValue]);

  // Wait for values to be defined before rendering children
  if (!values) {
    return null;
  }

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  );
};

export default AuthContext;
