import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["/node_modules/"],
  };
};
