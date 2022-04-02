import inquirer from "inquirer";
import script from "./index.js";
import axios from "axios";

console.log("\nHello there!\n");

const questions = [
    {
        type: "input",
        name: "git",
        message: "Please enter the type of Git server with which you'd like to sync contributions: `github` or `gitlab`",
        choices: ['github', 'gitlab'],
        default() {
            return 'github';
        },
    },
    {
        type: "input",
        name: "gituri",
        message:
            "Please enter Github/Gitlab server (no trailing slash) with which you'd like to sync contributions:",
        validate: (value) =>
            axios
                .get(`${value}`)
                .then(() => true)
                .catch(() => "Please enter an existing (or accessible) GitHub/GitLab server."),
    },
    {
        type: "input",
        name: "username",
        message:
            "Please enter GitHub nickname with which you'd like to sync contributions:",
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
                name: `Generate a bash script & execute it immediately.\n Note: it *will* push to origin main and it would be difficult to undo.`,
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
