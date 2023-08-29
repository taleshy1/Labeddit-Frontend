import { CommomButton } from "../../components/commonButton";
import { Header } from "../../components/header";
import { InputField } from "../../components/inputField"
import { SignupInterface, useForms } from "../../hooks/useForms/useForms";

export function RegisterPage() {
  const form: SignupInterface = {
    name: "",
    email: "",
    password: ""
  }

  const { input, changeInput, clear } = useForms(form);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="flex flex-col justify-around items-center min-h-[95vh] ">
        <h1 className="font-ibm font-bold text-3xl text-[#373737] ml-5 ">Olá, boas vindas ao LabEddit ;&#41;</h1>
        <form onSubmit={clear} className="flex flex-col items-center w-[22.8125rem] gap-1 mb-3">
          <div>

            <InputField
              placeHolder="Apelido"
              type="text"
              autocomplete="off"
              name="name"
              value={"name" in input ? input["name"] : ""}
              onChange={changeInput}
            />
            <InputField
              placeHolder="E-mail"
              type="text"
              autocomplete="on"
              name="email"
              value={"email" in input ? input["email"] : ""}
              onChange={changeInput}
            />
            <InputField
              placeHolder="Senha"
              type="password"
              autocomplete="on"
              name="password"
              value={"password" in input ? input["password"] : ""}
              onChange={changeInput}
            />
          </div>
          <div className="mt-14 flex flex-col  w-[22.5rem]">
            <p className="font-normal text-sm font-sans ">Ao continuar, você concorda com o nosso <a href="" className="text-[#4088CB] font-sans font-medium ">Contrato de usuario</a> e nossa <a href="" className="text-[#4088CB] font-sans font-medium ">Política de Privacidade</a></p>
            <div className="flex h-10 mt-2 mb-9 items-center">
              <input type="checkbox" required name="agree" id="agree" className="w-6 h-6 rounded-sm " />
              <p className="text-black font-sans font-normal text-[0.875rem] ml-[0.68rem]">
                Eu concordo em receber emails sobre coisas legais no Labeddit
              </p>
            </div>
            <CommomButton fill={true} text="Cadastrar" type="submit" />
          </div>
        </form>
      </main>
    </>
  )
}