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

interface IGDB_Image {
  url: string;
  type: "IGDB";
  size: "720p" | "1080p" | "micro" | "thumb" | "logo_med" | "cover_big";
}
interface TMDB_Image {
  url: string;
  type: "TMDB";
  size?: "original" | "w780" | "w500" | "w185" | "h632" | "w45" | "w92";
}

type Image_Type = IGDB_Image | TMDB_Image;
const Image_Helper = (image: Image_Type) => {
  if (image.url == "/images/notfound") return image.url;

  switch (image.type) {
    case "IGDB": {
      //strings are patterned t_

      const IGDB_Pattern = /t_(720p|1080p|micro|thumb|logo_med|cover_big)/;
      //if the string already starts w/ https do not concat
      if (image.url.slice(0, 6) == "https:")
        return image.url.replace(IGDB_Pattern, `t_${image.size}`);
      return "https:" + image.url.replace(IGDB_Pattern, `t_${image.size}`);
    }
    case "TMDB": {
      if (image.url.slice(0, 6) == "https:") {
        return image.url;
      }
      return `https://image.tmdb.org/t/p/${image.size ? image.size : "w500"}${
        image.url
      }`;
    }
  }
};

export default Image_Helper;
