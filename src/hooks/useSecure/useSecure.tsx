import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../router/coordinator";

export function useSecure() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("tokenAcess");

    if (!token) {
      goToLoginPage(navigate);
    }
  }, [navigate]);
  return 1;
}
