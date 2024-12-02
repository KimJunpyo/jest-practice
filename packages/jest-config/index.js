#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

// jest.config.ts 생성
function createJestConfig(targetDir) {
  const targetPath = path.join(targetDir, "jest.config.ts");
  const templatePath = path.join(__dirname, "jest.config.ts");
  const packageJsonPath = path.join(targetDir, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = fs.readJsonSync(packageJsonPath);
    packageJson.scripts = { ...packageJson.scripts, ...{ test: "jest" } };

    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
  }

  if (!fs.existsSync(targetPath)) {
    fs.copyFileSync(templatePath, targetPath);
    console.log(`✅ Created jest.config.ts at ${targetPath}`);
  } else {
    console.log(`⚠️ jest.config.ts already exists at ${targetPath}`);
  }
}

// 의존성 설치
function installDependencies(targetDir) {
  console.log("📦 Installing dependencies...");
  const packageJsonPath = path.join(__dirname, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.error("❌ No package.json found in the current directory.");
    process.exit(1);
  }
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const devDependencies = Object.entries(packageJson.devDependencies).map(
    ([name, version]) => `${name}@${version}`
  );
  console.log(targetDir);

  try {
    execSync(`pnpm add -D ${devDependencies.join(" ")}`, {
      stdio: "inherit",
      cwd: targetDir,
    });
  } catch (error) {
    console.error("❌ Failed to install dependencies:", error);
    process.exit(1);
  }
}

// CLI 실행
function main() {
  const args = process.argv.slice(2);
  const targetDir = args[0]
    ? path.resolve(process.cwd(), args[0])
    : process.cwd();
  console.log("🔧 Initializing Jest configuration...");
  createJestConfig(targetDir);
  installDependencies(targetDir);
}

main();
