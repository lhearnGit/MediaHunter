import { ScreenShot, Video } from "@/lib/entities/IGDB";

import { Stack, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import React from "react";
const VideoPlayer = dynamic(() => import("@/lib/ui/VideoPlayer/VideoPlayer"), {
  ssr: false,
});
const Gallery = dynamic(() => import("@/lib/ui/Gallery/Gallery"), {
  ssr: false,
});
const ScreenshotsAndVideo = ({
  screenshots,
  videos,
}: {
  screenshots?: ScreenShot[];
  videos?: Video[];
}) => {
  return (
    <Stack>
      {screenshots && (
        <>
          <Title>Screenshots</Title>
          <Gallery images={screenshots} />
        </>
      )}
      {videos && (
        <>
          <Title>Video</Title>
          <VideoPlayer videos={videos} />
        </>
      )}
    </Stack>
  );
};

export default ScreenshotsAndVideo;
