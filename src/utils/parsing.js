export function parseInputString(inputString) {
  let ranges = [];
  let resultArray = [];
  if (inputString.includes(",")) {
    ranges = inputString.split(",").map((el) => el.replace(/\s/g, ""));
    ranges.forEach((range) => {
      if (range.includes("-")) {
        const [start, end] = range.split("-").map(Number);
        if (start > end) {
          return resultArray.push(-1);
        }

        for (let i = start; i <= end; i++) {
          resultArray.push(i);
        }
      } else {
        resultArray.push(Number(range));
      }
    });
  } else {
    ranges = inputString;
    if (ranges.includes("-")) {
      const [start, end] = ranges.split("-").map(Number);

      if (start > end) {
        return [];
      }

      for (let i = start; i <= end; i++) {
        resultArray.push(i);
      }
    } else {
      resultArray.push(Number(ranges));
    }
  }

  return resultArray;
}

export function generateRangeArray(start, end) {
  const resultArray = [];

  for (let i = start; i <= end; i++) {
    resultArray.push(i);
  }

  return resultArray;
}
