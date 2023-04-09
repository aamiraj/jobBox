import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser, toogleLoading } from "../features/auth/authSlice";
import auth from "../firebase/firebase.config";

export const useMonitorAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email));
        dispatch(toogleLoading(false));
      } else {
        dispatch(getUser(""));
        dispatch(toogleLoading(false));
      }
    });
    return unsubscribe;
  }, [dispatch]);
};
