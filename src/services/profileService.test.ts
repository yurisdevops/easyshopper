import { getAuth } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { handleCreateProfile } from "./profileService";

// Mocks do Firebase para simular autenticação e escrita no Firestore
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "123", email: "test@example.com" }, // Simula usuário autenticado
  })),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => "mockDB"),
  collection: jest.fn(),
  doc: jest.fn(() => "mockDoc"),
  setDoc: jest.fn(() => Promise.resolve()), // Simula sucesso na gravação dos dados
}));

describe("handleCreateProfile", () => {
  beforeEach(() => {
    // Limpa o histórico de chamadas dos mocks antes de cada teste
    jest.clearAllMocks();
  });

  it("should call setDoc with the correct data", async () => {
    // Dados simulados de um perfil de usuário
    const mockData = {
      name: "John",
      lastname: "Doe",
      email: "test@example.com",
      gender: "male",
      birthdate: "1990-01-01",
      phone: "1234567890",
      cep: "12345-678",
      street: "Main Street",
      number: "123",
      neighborhood: "City Center",
      city: "New York",
      state: "NY",
      complement: "Suite 1",
      reference: "Near the mall",
    };

    // Chama a função que salva o perfil
    await handleCreateProfile(mockData as any);

    // Verifica se setDoc foi chamado exatamente uma vez
    expect(setDoc).toHaveBeenCalledTimes(1);

    // Verifica se setDoc foi chamado com os dados corretos
    expect(setDoc).toHaveBeenCalledWith(expect.anything(), mockData);
  });

  it("should not call setDoc if no user is logged in", async () => {
    // Simula que nenhum usuário está autenticado
    (getAuth as jest.Mock).mockReturnValue({ currentUser: null });

    // Chama a função com dados vazios (não importa, pois sem usuário, não deve salvar)
    await handleCreateProfile({} as any);

    // Verifica se setDoc **não** foi chamado
    expect(setDoc).not.toHaveBeenCalled();
  });
});
