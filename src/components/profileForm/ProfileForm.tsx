import { UseFormRegister } from "react-hook-form";
import { Input } from "../input/Input";

interface ProfileFormProps {
  register: UseFormRegister<any>;
  errors: any;
  value?: any;
}

export function ProfileForm({ errors, register }: ProfileFormProps) {
  return (
    <section>
      <div>
        <label>Nome:</label>
        <Input
          type="text"
          placeholder="Digite seu primeiro nome"
          name="name"
          register={register}
          error={errors.name?.message}
        />
        <label>Sobrenome:</label>
        <Input
          type="text"
          placeholder="Digite seu ultimo nome"
          name="lastname"
          register={register}
          error={errors.lastname?.message}
        />
        <label>Data de Nascimento:</label>
        <Input
          type="text"
          placeholder="ex: 23/12/1994"
          name="birthdate"
          register={register}
          error={errors.birthdate?.message}
        />
        <label>Gênero:</label>
        <Input
          type="text"
          placeholder="ex: masculino, feminino"
          name="gender"
          register={register}
          error={errors.gender?.message}
        />
        <label>Email:</label>
        <Input
          type="text"
          placeholder="Digite seu email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <label>Telefone:</label>
        <Input
          type="text"
          placeholder="Digite seu telefone"
          name="phone"
          register={register}
          error={errors.phone?.message}
        />
      </div>
    </section>
  );
}
