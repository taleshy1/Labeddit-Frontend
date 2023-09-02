import { useContext } from "react";
import logo from "../assets/logo.svg";
import { GlobalContext } from "../context/globalContext";
import { goToFeed, goToLoginPage } from "../router/coordinator";
import { useLocation, useNavigate } from "react-router-dom";
import xImmage from "../assets/xImmage.svg";

export function Header() {
  const location = useLocation();
  const globalContext = useContext(GlobalContext) || {
    isLogged: false,
    setIsLogged: () => {},
  };
  const { isLogged, setIsLogged } = globalContext;
  const navigate = useNavigate();
  return (
    <header className="w-full h-[5vh] bg-gray-200 relative flex ">
      {location.pathname.includes("/comments") && (
        <button
          onClick={() => {
            goToFeed(navigate);
          }}
          className="pl-5"
        >
          <img src={xImmage} alt="Voltar" />
        </button>
      )}

      <img
        src={logo}
        alt="LabEddit logo"
        className="align-middle max-h-full absolute top-0 left-1/2"
      />
      <button
        className="text-[#4088CB] ml-auto mr-4"
        onClick={
          isLogged
            ? () => {
                localStorage.removeItem("tokenAcess");
                setIsLogged(false);
                goToLoginPage(navigate);
              }
            : () => {
                goToLoginPage(navigate);
              }
        }
      >
        {isLogged ? "Logout" : "Login"}
      </button>
    </header>
  );
}
