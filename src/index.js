import { parse } from "node-html-parser";
import axios from "axios";
import fs from "fs";
import shell from "shelljs";

// Gathers needed git commands for bash to execute per provided contribution data.
const getCommand = (contribution) => {
  return `GIT_AUTHOR_DATE="${contribution.date}T12:00:00" GIT_COMMITER_DATE="${contribution.date}T12:00:00" git commit --allow-empty -m "Rewriting History!" > /dev/null\n`.repeat(
    contribution.count
  );
};

export default async (input) => {
  // Returns contribution graph html for a full selected year.
  const res = await axios.get(
    `https://github.com/${input.username}?tab=overview&from=${input.year}-12-01&to=${input.year}-12-31`
  );

  // Retrieves needed data from the html, grabs all the existing squares.
  const document = parse(res.data);
  const elements = document.querySelectorAll("td.ContributionCalendar-day");

  let filteredDays = [];
  elements.forEach((el) => {
    // GH no longer stores # of contributions on the squares, so we have to
    // find corresponding tooltip with accurate data.
    const tooltipData = document.querySelector(`tool-tip[for="${el.id}"]`);
    const innerContent = tooltipData.firstChild.textContent;

    // Skipping those that have no contributoons
    if (innerContent.includes("No")) return;

    const numContributions = innerContent.split(" contribution")?.[0];
    filteredDays.push({
      date: el.getAttribute("data-date"),
      count: isNaN(parseInt(numContributions)) ? 0 : parseInt(numContributions),
    });
  });

  const script = filteredDays
    .map((contribution) => getCommand(contribution))
    .join("\n")
    .concat("git pull origin main\n", "git push -f origin main");

  fs.writeFile("script.sh", script, () => {
    console.log("\nFile was created successfully.");

    if (input.execute) {
      console.log("This might take a moment!\n");
      shell.exec("sh ./script.sh");
    }
  });
};
