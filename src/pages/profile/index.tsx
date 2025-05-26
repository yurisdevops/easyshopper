import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddressForm } from "../../components/addressForm/AddressForm";
import { ProfileForm } from "../../components/profileForm/ProfileForm";
import { handleCreateProfile } from "../../services/profileService";
import {
  profileSchema,
  UserProfileFormData,
} from "../../utils/validations/profileSchema";

export function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  return (
    <main>
      <form onSubmit={handleSubmit(handleCreateProfile)}>
        <ProfileForm register={register} errors={errors} />
        <AddressForm register={register} errors={errors} />
      </form>
    </main>
  );
}
