import { useState } from "react";
import { CommomButton } from "../../components/CommonButton";
import { Header } from "../../components/Header";
import { InputField } from "../../components/InputField";
import { SignupInterface, useForms } from "../../hooks/useForms/useForms";
import { useNavigate } from "react-router-dom";
import { dataValidation } from "../../services/dataValidationService";
import { signup } from "../../services/authService";
import { goToFeed } from "../../router/coordinator";

export function RegisterPage() {
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(
    "insira corretamente os dados"
  );
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [anyOtherError, setAnyOtherError] = useState(false);
  const form: SignupInterface = {
    name: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const { input, changeInput, clear } = useForms(form);

  const onSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: SignupInterface = {
      email: "email" in input ? input["email"] : "",
      name: "name" in input ? input["name"] : "",
      password: "password" in input ? input["password"] : "",
    };

    if (
      !dataValidation("email", body.email) ||
      !dataValidation("password", body.password) ||
      !dataValidation("name", body.name)
    ) {
      if (!dataValidation("name", body.name)) {
        setNameIsValid(false);
        setErrorMessage("O nome deve conter no mínimo 2 caracteres");
        return;
      } else {
        setNameIsValid(true);
        setErrorMessage("insira corretamente os dados");
      }

      if (!dataValidation("email", body.email)) {
        setEmailIsValid(false);
        setErrorMessage("Insira um email válido");
        return;
      } else {
        setEmailIsValid(true);
        setErrorMessage("insira corretamente os dados");
      }

      if (!dataValidation("password", body.password)) {
        setPasswordIsValid(false);
        setErrorMessage("A senha deve conter no minimo 6 digitos");
        return;
      } else {
        setPasswordIsValid(true);
        setErrorMessage("insira corretamente os dados");
      }
    }
    setNameIsValid(true);
    setPasswordIsValid(true);
    setEmailIsValid(true);

    const response = await signup(body);
    if (response === "Usuario cadastrado com sucesso") {
      setAnyOtherError(false);
      clear;
      goToFeed(navigate);
      return;
    }
    if (
      (response.message !== "Network Error" && response.response.data) ===
      "email já existe"
    ) {
      setEmailIsValid(false);
      setAnyOtherError(false);
      setErrorMessage(response.response.data);
      return;
    }
    setAnyOtherError(true);
    setErrorMessage(response.response.data);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="flex flex-col justify-around items-center min-h-[95vh] ">
        <h1 className="font-ibm font-bold text-3xl text-[#373737] ml-5 ">
          Olá, boas vindas ao LabEddit ;&#41;
        </h1>
        <form
          onSubmit={onSubmitSignup}
          className="flex flex-col items-center w-[22.8125rem] gap-1 mb-3"
        >
          <div>
            {!nameIsValid && (
              <p className="text-red-500 mb-2">{errorMessage}</p>
            )}
            {anyOtherError && (
              <p className="text-red-500 mb-2">Erro inesperado</p>
            )}
            <InputField
              isValid={nameIsValid}
              placeHolder="Apelido"
              type="text"
              autocomplete="off"
              name="name"
              value={"name" in input ? input["name"] : ""}
              onChange={changeInput}
            />
            {!emailIsValid && (
              <p className="text-red-500 mb-2">{errorMessage}</p>
            )}
            <InputField
              isValid={emailIsValid}
              placeHolder="E-mail"
              type="text"
              autocomplete="on"
              name="email"
              value={"email" in input ? input["email"] : ""}
              onChange={changeInput}
            />
            {!passwordIsValid && (
              <p className="text-red-500 mb-2">{errorMessage}</p>
            )}
            <InputField
              isValid={passwordIsValid}
              placeHolder="Senha"
              type="password"
              autocomplete="on"
              name="password"
              value={"password" in input ? input["password"] : ""}
              onChange={changeInput}
            />
          </div>
          <div className="mt-14 flex flex-col  w-[22.5rem]">
            <p className="font-normal text-sm font-sans ">
              Ao continuar, você concorda com o nosso{" "}
              <a href="" className="text-[#4088CB] font-sans font-medium ">
                Contrato de usuario
              </a>{" "}
              e nossa{" "}
              <a href="" className="text-[#4088CB] font-sans font-medium ">
                Política de Privacidade
              </a>
            </p>
            <div className="flex h-10 mt-2 mb-9 items-center">
              <input
                type="checkbox"
                required
                name="agree"
                id="agree"
                className="w-6 h-6 rounded-sm "
              />
              <p className="text-black font-sans font-normal text-[0.875rem] ml-[0.68rem]">
                Eu concordo em receber emails sobre coisas legais no Labeddit
              </p>
            </div>
            <CommomButton fill={true} text="Cadastrar" type="submit" />
          </div>
        </form>
      </main>
    </>
  );
}
