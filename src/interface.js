import inquirer from "inquirer";
import script from "./index.js";
import axios from "axios";

console.log("\nHello there!\n");

const questions = [
  {
    type: "input",
    name: "username",
    message:
      "Please enter GitHub nickname with which you'd like to sync contributions:",
    validate: (value) =>
      axios
        .get(`https://api.github.com/users/${value}`)
        .then(() => true)
        .catch(() => "Please enter an existing GitHub username."),
  },
  {
    type: "input",
    name: "year",
    message: "What year would you like to sync?",
    default() {
      return new Date().getFullYear();
    },
  },
  {
    type: "list",
    message: "How would you like this to happen?",
    name: "execute",
    choices: [
      {
        name: `Generate a bash script & execute it immediately.\n  Note: it *will* push to origin main and it would be difficult to undo.`,
        value: true,
      },
      {
        name: "Only generate, no execution.",
        value: false,
      },
    ],
    default: () => false,
  },
  {
    type: "confirm",
    name: "confirm",
    message: "Ready to proceed?",
  },
];

inquirer.prompt(questions).then((answers) => {
  if (answers.confirm) {
    script(answers);
  }
});
