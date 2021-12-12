// Gathers all the squares from GitHub contribution graph.
const allSquares = document.querySelectorAll("[data-count]");

// We only want html elements of squares with 1+ commits/issues for that day.
const relevantContributions = Object.values(allSquares)
  .filter((value) => value.dataset.count > 0)
  .map((filteredSquares) => {
    return {
      date: filteredSquares.dataset.date,
      count: filteredSquares.dataset.count,
    };
  });

console.log(JSON.stringify(relevantContributions));
