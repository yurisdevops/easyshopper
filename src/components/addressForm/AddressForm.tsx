import { UseFormRegister } from "react-hook-form";
import { Input } from "../input/Input";

interface AddressFormProps {
  register: UseFormRegister<any>;
  errors: any;
  value?: any;
}

export function AddressForm({ errors, register }: AddressFormProps) {
  return (
    <section>
      <div>
        <label>Cep:</label>
        <Input
          type="text"
          placeholder="ex: 23000-000"
          name="cep"
          register={register}
          error={errors.cep?.message}
        />
        <label>Rua:</label>
        <Input
          type="text"
          placeholder="ex: Rua 1"
          name="street"
          register={register}
          error={errors.street?.message}
        />
        <label>Número</label>
        <Input
          type="text"
          placeholder="ex: 123"
          name="number"
          register={register}
          error={errors.number?.message}
        />
        <label>Bairro:</label>
        <Input
          type="text"
          placeholder="ex: Centro"
          name="neighborhood"
          register={register}
          error={errors.neighborhood?.message}
        />
        <label>Cidade:</label>
        <Input
          type="text"
          placeholder="ex: Sao Paulo"
          name="city"
          register={register}
          error={errors.city?.message}
        />
        <label>Estado:</label>
        <Input
          type="text"
          placeholder="ex: SP"
          name="state"
          register={register}
          error={errors.state?.message}
        />
        <label>Complemento:</label>
        <Input
          type="text"
          placeholder="ex: Apartamento 409 bloco 1"
          name="complement"
          register={register}
          error={errors.complement?.message}
        />
        <label>Referencia:</label>
        <Input
          type="text"
          placeholder="ex: Proximo ao mercado X"
          name="reference"
          register={register}
          error={errors.reference?.message}
        />
      </div>
    </section>
  );
}
