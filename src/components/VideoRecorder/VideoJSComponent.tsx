import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import "webrtc-adapter";
import RecordRTC from "recordrtc";

// register videojs-record plugin with this import
import "videojs-record/dist/css/videojs.record.css";

// eslint-disable-next-line no-unused-vars
import Record from "videojs-record";
import { useEffect, useRef, version } from "react";
import Player from "video.js/dist/types/player";

interface Props {
  options: Record<string, any>;
  onReady: (player: Player) => void;
}
export const VideoJSComponent = ({ options, onReady }: Props) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player>();

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.className = "video-js vjs-default-skin";

      if (!videoRef.current) {
        // Return early if no video ref
        return;
      }

      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        // print version information at startup
        const version_info =
          "Using video.js " +
          videojs.VERSION +
          " with videojs-record " +
          videojs.getPluginVersion("record") +
          ", recordrtc " +
          RecordRTC.version +
          " and React " +
          version;
        videojs.log(version_info);

        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change
    } else {
      // const player = playerRef.current;
      // player.record().getDevice();
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = undefined;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJSComponent;
