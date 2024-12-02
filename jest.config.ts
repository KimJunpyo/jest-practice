import type { Config } from "jest";
import { readdirSync } from "fs";
import { join } from "path";

const appsDir = join(__dirname, "apps");
const projects = readdirSync(appsDir)
  .filter((folder) => folder !== ".DS_Store") // macOS 시스템 파일 제거
  .map((folder) => `<rootDir>/apps/${folder}`);
console.log("Detected Jest projects:", projects); // 디버그 출력

// Add any custom config to be passed to Jest
const config: Config = {
  // coverageProvider: "v8",
  // testEnvironment: "jsdom",
  // // Add more setup options before each test is run
  // // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // moduleNameMapper: {
  //   // TypeScript 경로 별칭을 Jest가 이해할 수 있도록 매핑
  //   "^@/(.*)$": "<rootDir>/apps/$1",
  // },
  // transform: {
  //   // TypeScript와 JSX 파일을 처리하도록 ts-jest 설정
  //   "^.+\\.(ts|tsx)$": "ts-jest",
  // },
  // rootDir: __dirname,
  // testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"], // 일반적인 테스트 파일 패턴,
  projects,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default config;
