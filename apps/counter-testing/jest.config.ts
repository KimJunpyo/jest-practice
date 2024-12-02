import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // TypeScript 경로 별칭을 Jest가 이해할 수 있도록 매핑
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    // TypeScript와 JSX 파일을 처리하도록 ts-jest 설정
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
