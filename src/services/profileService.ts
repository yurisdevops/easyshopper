import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { UserProfileFormData } from "../utils/validations/profileSchema";
import { db } from "./firebaseConnection";

export const handleCreateProfile = async (data: UserProfileFormData) => {
  const auth = getAuth();
  if (!auth.currentUser) {
    return;
  }

  try {
    const userRef = collection(db, "users");
    const userId = auth.currentUser?.uid;
    if (!userId) {
      return;
    }
    await setDoc(doc(userRef, userId), data);
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
  }
};
