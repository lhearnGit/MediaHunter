const Resize_Image = (
  url: string,
  size: "720p" | "1080p" | "micro" | "thumb" | "logo_med" | "cover_big"
) => {
  return url.replace("t_thumb", `t_${size}`);
};
export default Resize_Image;
