import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";
import { LoginInterface, SignupInterface } from "../hooks/useForms/useForms";

export const login = async (body: LoginInterface) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, body);
    localStorage.setItem("tokenAcess", response.data.token);
    return response.data.message;
  } catch (error) {
    return error;
  }
};

export const logout = () => {
  localStorage.removeItem("tokenAcess");
  return "Usuário deslogado";
};

export const signup = async (body: SignupInterface) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, body);
    localStorage.setItem("tokenAcess", response.data.token);
    return response.data.message;
  } catch (error) {
    return error;
  }
};
