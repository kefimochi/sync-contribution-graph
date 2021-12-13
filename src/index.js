import { parse } from "node-html-parser";
import axios from "axios";
import fs from "fs";
import shell from "shelljs";

export default async (input) => {
  const res = await axios.get(
    `https://github.com/users/${input.username}/contributions?tab=overview&from=${input.year}-12-01&to=${input.year}-12-31`
  );

  // Gathers all the squares from GitHub contribution graph.
  const allSquares = parse(res.data).querySelectorAll("[data-count]");

  const script = allSquares
    .reduce((fullCommand, contribution) => {
      const count = contribution._rawAttrs["data-count"];
      const date = contribution._rawAttrs["data-date"];

      // Only care about html elements of squares with 1+ contributions for that day.
      if (count > 0) {
        return (fullCommand +=
          `GIT_AUTHOR_DATE=${date}T12:00:00 GIT_COMMITER_DATE=${date}T12:00:00 git commit --allow-empty -m "Rewriting History!" > /dev/null\n`.repeat(
            count
          ));
      }
      return fullCommand;
    }, "#!/bin/bash \n")
    .concat("", "git pull origin main\ngit push -f origin main");

  fs.writeFile("script.sh", script, () => {
    console.log("\nFile was created successfully.");

    if (input.execute) {
      console.log("This might take a moment!\n");
      shell.exec("sh ./script.sh");
    }
  });
};
