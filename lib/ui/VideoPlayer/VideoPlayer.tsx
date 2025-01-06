"use client";

import { Video } from "@/lib/entities/IGDB";
import { Button, Grid } from "@mantine/core";
import { useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videos }: { videos: Video[] }) => {
  const [loadedVideo, setLoadedVideo] = useState<Video>(videos[0]);
  if (!videos) return <p>No Videos</p>;
  return (
    <Grid>
      <Grid.Col span={12}>
        <ReactPlayer
          className="shadow-xl shadow-black my-auto"
          url={`https://www.youtube.com/watch?v=${loadedVideo.video_id}`}
        />
      </Grid.Col>
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
    </Grid>
  );
};

export default VideoPlayer;
