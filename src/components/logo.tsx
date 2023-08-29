import logo from "../assets/logo.svg";
interface LogoProps {
  width: string,
  heigth: string,
  alt: string
}
export function Logo({ alt, heigth, width }: LogoProps) {
  return (
    <img
      className={`w-${width} h-${heigth} mb-[0.69rem]`}
      src={logo}
      alt={alt}
    />)
}