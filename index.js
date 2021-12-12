import { parse } from "node-html-parser";
import axios from "axios";
import fs from "fs";

export default async (input) => {
  const res = await axios.get(
    `https://github.com/users/${input.username}/contributions?tab=overview&from=${input.year}-12-01&to=${input.year}-12-31`
  );

  // Gathers all the squares from GitHub contribution graph.
  const allSquares = parse(res.data).querySelectorAll("[data-count]");

  // We only want html elements of squares with 1+ commits/issues for that day.
  const script = allSquares
    .reduce((fullCommand, contribution) => {
      const count = contribution._rawAttrs["data-count"];
      const date = contribution._rawAttrs["data-date"];

      if (count > 0) {
        return (fullCommand +=
          `GIT_AUTHOR_DATE=${date}T12:00:00 GIT_COMMITER_DATE=${date}T12:00:00 git commit --allow-empty -m "Rewriting History!" > /dev/null\n`.repeat(
            count
          ));
      }
      return fullCommand;
    }, "#!/bin/bash \n")
    .concat("", "git pull origin main\ngit push -f origin main");

  fs.writeFile("script.sh", script, (err) => {
    if (err) throw err;
    console.log("File is created successfully.");
  });

  if (input.execute) {
    console.log("Scary territory!");
  }
};
