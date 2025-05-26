import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: string;
  value?: string;
  disable?: boolean;
}

export function Input({
  type,
  placeholder,
  name,
  register,
  error,
  rules,
  disable,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name, rules)}
        disabled={disable}
      />
      {error && <p>{error}</p>}
    </div>
  );
}
