import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "./store";
import { setBearerToken } from "./services/api";

const AuthObserver = () => {
  const hasMounted = useRef(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      if (!hasMounted.current) {
        hasMounted.current = true;
      } else {
        // navigate("/loginpage");
        setBearerToken("");
      }
    } else {
      setBearerToken(token);
    }
  }, [token, navigate]);

  return null;
};

export default AuthObserver;
