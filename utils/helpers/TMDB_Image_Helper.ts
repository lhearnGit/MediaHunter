const back_dropSize = ["w300", "w780", "w1280", "original"];
const logo_sizes = ["w45", "w92", "w154", "w185", "w300", "w500", "original"];
const poster_sizes = [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original",
];

export const TMDB_Image_Helper = (
  url: string,
  option?: "original" | "w780" | "w500" | "w185" | "h632" | "w45" | "w92"
) => {
  const size = "w500";

  const baseUrl = `https://image.tmdb.org/t/p/${option ? option : size}${url}`;
  return baseUrl;
};
