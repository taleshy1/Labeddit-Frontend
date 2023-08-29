import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { CommomButton } from "../../components/commonButton";
import { InputField } from "../../components/inputField";
import { LoginInterface, useForms } from "../../hooks/useForms/useForms";
import { goToFeed, goToSignupPage } from "../../router/coordinator";
import { login } from "../../services/authService";
import { useState } from "react"
import { dataValidation } from "../../services/dataValidationService";
export function LoginPage() {
  const [wrongInfos, setWrongInfos] = useState(false)
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState("Email ou senha incorretos")
  const navigate = useNavigate()

  const form: LoginInterface = {
    email: "",
    password: ""
  }

  const goToSignup = () => {
    goToSignupPage(navigate)
  }

  const { input, changeInput, clear } = useForms(form)

  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body: LoginInterface = {
      email: "email" in input ? input["email"] : "",
      password: "password" in input ? input["password"] : ""
    }

    if (!dataValidation("email", body.email)) {
      setEmailIsValid(false)
      setErrorMessage("Insira um email válido")
      return
    } else {
      setErrorMessage("Email ou senha incorretos")
      setEmailIsValid(true)
    }
    setEmailIsValid(true)
    const response: string = await login(body)
    if (response === "Login efetuado com sucesso") {
      setWrongInfos(false)
      clear
      goToFeed(navigate)
      return
    }
    setWrongInfos(true)
    setErrorMessage("Email ou senha incorretos")
    clear
  }
  return (
    <main className="min-h-screen items-center justify-center flex flex-col">
      <img
        className="w-[5.25rem] h-[5.25131rem] mb-[0.69rem]"
        src={logo}
        alt="Logo do LabEddit"
      />
      <h1 className="font-ibm text-4xl text-[#373737]">LabEddit</h1>
      <h2 className="mb-[6.69rem] ">O projeto de rede social da Labenu</h2>

      <form className=" flex flex-col items-center justify-center "
        onSubmit={onSubmitLogin}>
        {(!emailIsValid || wrongInfos) && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <InputField
          isValid={emailIsValid}
          placeHolder="E-mail"
          type="text"
          autocomplete="on"
          name="email"
          value={"email" in input ? input["email"] : ""}
          onChange={changeInput}
        />
        <InputField
          isValid={true}
          placeHolder="Senha"
          type="password"
          autocomplete="off"
          name="password"
          value={"password" in input ? input["password"] : ""}
          onChange={changeInput}
        />
        <div className="mt-14 flex flex-col gap-5 w-[22.5rem]">
          <CommomButton text="Continuar" fill={true} type="submit" />
          <div className="h-px bg-gradient-to-r from-[#FF6489] to-[#F9B24E]" />
          <CommomButton text="Crie uma conta!" fill={false} type="button" action={goToSignup} />
        </div>
      </form>
    </main>
  );
}
