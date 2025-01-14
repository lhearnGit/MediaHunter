const IGDB_Image_Helper = (
  url: string,
  size: "720p" | "1080p" | "micro" | "thumb" | "logo_med" | "cover_big"
) => {
  return "https:" + url.replace("t_thumb", `t_${size}`);
};
export default IGDB_Image_Helper;
