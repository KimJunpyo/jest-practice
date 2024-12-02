#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer").default;
const { execSync } = require("child_process");

const { readdirSync, copySync } = fs;

const program = new Command();

program
  .version("1.0.0")
  .arguments("<project-name> [template-name]")
  .option("-t, --test", "install jest")
  .description("Create a new React project from a blaster template")
  .action(async (projectName, templateName, options) => {
    const templatesDir = path.resolve(__dirname, "../../templates");
    const targetDir = path.resolve(process.cwd(), projectName);
    const templates = readdirSync(templatesDir);
    let template = templateName;

    if (!template) {
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "template",
          message: "Choose a template:",
          choices: templates,
        },
      ]);
      template = answers.template;
    }

    // Validate the template exists
    if (!templates.includes(template)) {
      console.error(`Template "${template}" does not exist.`);
      process.exit(1);
    }

    // Copy template
    const templateDir = path.join(templatesDir, template);
    console.log(
      `Creating project in ${targetDir} using template "${template}"...`
    );
    copySync(templateDir, targetDir);
    const packageJsonPath = path.join(targetDir, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = fs.readJsonSync(packageJsonPath);
      packageJson.name = projectName;

      fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
    }
    if (options.test) {
      execSync(`init-jest ${projectName}`, { stdio: "inherit" });
    }

    // Success message
    console.log("Project created successfully!");
  });

program.parse(process.argv);
