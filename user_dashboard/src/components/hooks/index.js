import { useContext } from "react";
import { EmailContext } from "../contexts/EmailContext";
export const useEmail = () => {
  const context = useContext(EmailContext);
  return context;
};
