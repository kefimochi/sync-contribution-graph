import inquirer from "inquirer";
import script from "./index.js";
import axios from "axios";

console.log("\nHello there!\n");

const questions = [
  {
    type: "input",
    name: "nickname",
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
    type: "confirm",
    name: "confirm",
    message: "Ready to push generated commits to remote origin?",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, "  "));
  if (answers.confirm) {
    script(answers.nickname, answers.year);
  }
});
