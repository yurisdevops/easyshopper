/** @type {import('jest').Config} */
export default {
  preset: "ts-jest/presets/default-esm", // ESM + TypeScript
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^firebase/auth$": "<rootDir>/src/services/__mocks__/firebaseAuthMock.ts",
    "^firebase/firestore$":
      "<rootDir>/src/services/__mocks__/firebaseFirestoreMock.ts",
  },

  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
};
