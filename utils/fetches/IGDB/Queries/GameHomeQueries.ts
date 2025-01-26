import { ArrayToCSV } from "@/utils/helpers/stringFns";
import { IGDBQuery } from "@/utils/zodSchemas/IGDBQuerySchema";
import { round } from "lodash";

const today = round(new Date().valueOf() * 0.001); //convert from miliseconds to seconds

const day = 86400;
const week = 604800;
const month = 2629743;

//params should be validated and parsed to CSV if array before passing to query
const query: IGDBQuery = {
  queryOption: "&",
  genres: ["33", "31"],
  platform_family: ["6"],
  platforms: ["1", "2"],
  themes: "1",
};
export function setQuery(
  page: number,
  options: string | null,
  genre: string | null,
  theme: string | null,
  page_size?: number
) {
  /*const { success, data, error } = isValidIGDBQuery.safeParse(query);


  let g = data?.genres;
  let t = data?.themes;
  let o = data?.queryOption;
  let pf = data?.platform_family;
  let p = data?.platforms;

  let tcondition = "";
  let gcondition = "";
  let pcondition = "";
  let pfcondition = "";

  let where = "where ";

  if (p) {
    pcondition = ` platforms.id = ${
      Array.isArray(p) ? `(${ArrayToCSV(p)})` : p
    }`;
  }
  if (pf) {
    pfcondition = ` platforms.platform_family = ${
      Array.isArray(pf) ? `(${ArrayToCSV(pf)})` : `${pf}`
    } `;
  }
  if (t) {
    tcondition = Array.isArray(t)
      ? `themes = [${ArrayToCSV(t)}]`
      : `themes = ${t}`;
  }
  if (g) {
    gcondition = Array.isArray(g)
      ? `genres = [${ArrayToCSV(g)}]`
      : `genres = ${g}`;
  }

  where +=
    pcondition +
    " & " +
    pfcondition +
    " & " +
    tcondition +
    " " +
    o +
    " " +
    gcondition +
    ";";
  console.log(where);
*/
  const paginationString = `
    limit ${page_size ? page_size : 25};
    offset ${page > 1 ? page * (page_size ? page_size : 25) : 0};`;

  const fieldsString = `fields name,cover.url, themes.name, themes.id, genres.id, genres.name, summary, rating, rating_count, platforms.id, platforms.name, platforms.slug, platforms.platform_family.id;`;

  const sortString = `sort hypes desc;`;

  const RecentQuery = `
    ${fieldsString}
    ${sortString}
    ${paginationString}
    where 
        first_release_date < ${today} &
        first_release_date > ${today - month};`; //releases within last 30  days

  const upComingQuery = `
    ${fieldsString}
    ${sortString}
    ${paginationString}
    where 
        first_release_date >${today} & status != 0;`; //not yet released games

  switch (options) {
    case "recent":
      return RecentQuery;
    case "upcoming":
      return upComingQuery;
    case "search": {
      if (genre || theme) {
        let searchQuery = `
        ${fieldsString}
        sort rating_count desc;
        ${paginationString}
        ${WhereFilter(genre, theme)}`;

        console.log(searchQuery);
        return searchQuery;
      } else return RecentQuery;
    }
    default:
      return RecentQuery;
  }
}

function WhereFilter(genre: string | null, theme: string | null): string {
  const allowablePlatforms = ["1", "2", "3", "4", "5", "6", "14"]; //platforms 6 and 14 are not families
  const platforms = ["1", "2"];

  const andor = "|";
  //always be Platforms AND others, not OR
  const platformFamilyFilter = `platforms.platform_family=(${ArrayToCSV(
    platforms
  )})`;
  const genresFilter = `& or | or none genres = [${genre}]`;

  if (genre && theme)
    return `where ${platformFamilyFilter} & genres = [${genre}] & themes = [${theme}];`;
  if (genre) return `where genres = [${genre}];`;
  if (theme) return `where themes = [${theme}];`;
  return "";
}
