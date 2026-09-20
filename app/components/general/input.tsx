"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  disabled,
  type = "text",
  required,
  register,
  errors,
}) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      required={required}
      {...register(id, { required })}
      className={`w-full h-12 px-4 border rounded-md outline-none my-2
        ${errors[id] ? "border-red-500" : "border-gray-300"}
        ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
      `}
    />
  );
};

export default Input;
