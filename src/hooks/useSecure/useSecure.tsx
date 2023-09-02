import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../router/coordinator";
import { GlobalContext } from "../../context/globalContext";

export function useSecure() {
  const globalContext = useContext(GlobalContext) || {
    isLogged: false,
    setIsLogged: () => {},
  };
  const { isLogged, setIsLogged } = globalContext;
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenAcess");
  useEffect(() => {
    if (token) {
      setIsLogged(true);
      return;
    }
    setIsLogged(false);
    goToLoginPage(navigate);
  }, [navigate, token, setIsLogged, isLogged]);
}
