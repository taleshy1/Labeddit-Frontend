import { useState } from "react";

export interface LoginInterface {
  email: string;
  password: string;
}

export interface SignupInterface {
  email: string;
  name: string;
  password: string;
}

export interface PostInterface {
  post: string;
}

export type FormInput = LoginInterface | SignupInterface | PostInterface;

export function useForms(initialData: FormInput) {

  const [input, setInput] = useState(initialData);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const clear = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInput(initialData);
  };

  return { input, changeInput, clear };
}
