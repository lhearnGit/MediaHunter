const IGDB_Image_Helper = (
  url: string,
  size: "720p" | "1080p" | "micro" | "thumb" | "logo_med" | "cover_big"
) => {
  //strings are patterned t_
  const pattern = /t_(720p|1080p|micro|thumb|logo_med|cover_big)/;
  //if the string already starts w/ https do not concat
  if (url.slice(0, 6) == "https:") return url.replace(pattern, `t_${size}`);
  return "https:" + url.replace(pattern, `t_${size}`);
};
export default IGDB_Image_Helper;
