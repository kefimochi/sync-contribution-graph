import { parse } from "node-html-parser";
import axios from "axios";
import fs from "fs";
import shell from "shelljs";

function commits_for(contribution) {
  return `GIT_AUTHOR_DATE=${contribution.date}T12:00:00 GIT_COMMITER_DATE=${contribution.date}T12:00:00 git commit --allow-empty -m "Rewriting History!" > /dev/null\n`.repeat(contribution.count)
}

export default async (input) => {
  const res = await axios.get(
    `https://github.com/users/${input.username}/contributions?tab=overview&from=${input.year}-12-01&to=${input.year}-12-31`
  );

  // Gathers all the squares from GitHub contribution graph.
  const script = parse(res.data).querySelectorAll("[data-count]")
    .map(el => { return {date: el.attributes["data-date"], count: parseInt(el.attributes["data-count"])}} )
    .filter(contribution => contribution.count > 0)
    .map(contribution => commits_for(contribution))
    .join("")
    .concat(
      "git pull origin main\n",
      "git push -f origin main"
    );

  fs.writeFile("script.sh", script, () => {
    console.log("\nFile was created successfully.");

    if (input.execute) {
      console.log("This might take a moment!\n");
      shell.exec("sh ./script.sh");
    }
  });
};
