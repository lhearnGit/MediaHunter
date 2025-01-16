export function PipeSeparatedString(OrString: string[]) {
  let PipeSeparatedString = ``;
  OrString.forEach((id) => {
    if (PipeSeparatedString.length > 0) PipeSeparatedString += `|${id}`;
    else PipeSeparatedString += `${id}`;
  });
  return PipeSeparatedString;
}
export function ArrayToCSV(OrString: string[]) {
  let CSVString = ``;
  OrString.forEach((id) => {
    if (CSVString.length > 0) CSVString += `,${id}`;
    else CSVString += `${id}`;
  });
  return CSVString;
}
