import logo from "../assets/logo.svg"

export function Header() {
  return (
    <header className="w-full h-[5vh] bg-gray-200 relative flex ">
      <img src={logo} alt="LabEddit logo" className="align-middle max-h-full absolute top-0 left-1/2" />
      <button className="text-[#4088CB] ml-auto mr-4">Entrar</button>
    </header>
  )
}