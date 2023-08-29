import { NavigateFunction } from "react-router-dom"

export const goToSignupPage = (navigate: NavigateFunction) => {
  navigate("/signup")
}
export const goToLoginPage = (navigate: NavigateFunction) => {
  navigate("/login")
}
export const goToFeed = (navigate: NavigateFunction) => {
  navigate("/")
} 