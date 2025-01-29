"use client";

import { Video } from "@/lib/entities/IGDB";
import { Button, SimpleGrid, Space, Stack } from "@mantine/core";
import { useState } from "react";
import ReactPlayer from "react-player";
import classes from "./videoplayer.module.css";
const VideoPlayer = ({ videos }: { videos: Video[] }) => {
  const [loadedVideo, setLoadedVideo] = useState<Video>(videos[0]);
  if (!videos) return <p>No Videos</p>;
  return (
    <Stack>
      <div className={classes.playerWrapper}>
        <ReactPlayer
          height={"90%"}
          width={"90%"}
          className={classes.reactPlayer}
          url={`https://www.youtube.com/watch?v=${loadedVideo.video_id}`}
        />
      </div>

      <SimpleGrid cols={4} w={"90%"}>
        {videos?.map((video: Video) => (
          <Button
            color={video.id == loadedVideo.id ? "gray" : ""}
            key={video.id}
            onClick={() => {
              setLoadedVideo(video);
            }}
          >
            {video.name}
          </Button>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default VideoPlayer;
