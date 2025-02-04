export function PipeSeparatedString(ArrayOfStrings: string[]) {
  let PipeSeparatedString = ``;
  ArrayOfStrings.forEach((item) => {
    if (PipeSeparatedString.length > 0) PipeSeparatedString += `|${item}`;
    else PipeSeparatedString += `${item}`;
  });
  return PipeSeparatedString;
}
export function ArrayToCSV(ArrayOfStrings: string[]) {
  let CSVString = ``;
  ArrayOfStrings.forEach((item) => {
    if (CSVString.length > 0) CSVString += `,${item}`;
    else CSVString += `${item}`;
  });
  return CSVString;
}
