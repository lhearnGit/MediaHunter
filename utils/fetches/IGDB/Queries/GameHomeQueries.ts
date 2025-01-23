import { round } from "lodash";

const today = round(new Date().valueOf() * 0.001); //convert from miliseconds to seconds

const day = 86400;
const week = 604800;
const month = 2629743;

export function setQuery(
  page: number,
  options: string | null,
  genre: string | null,
  theme: string | null,
  page_size?: number
) {
  const paginationString = `
    limit ${page_size ? page_size : 25};
    offset ${page > 1 ? page * (page_size ? page_size : 25) : 0};`;

  const fieldsString = `fields name,cover.url, themes.name, themes.id, genres.id, genres.name, summary, rating, rating_count;`;

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
  if (genre && theme) return `where genres = [${genre}] & themes = [${theme}];`;
  if (genre) return `where genres = [${genre}];`;
  if (theme) return `where themes = [${theme}];`;
  return "";
}
