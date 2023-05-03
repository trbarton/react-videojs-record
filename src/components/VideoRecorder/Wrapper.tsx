import React from "react";
import "./VideoRecorder.css";
import VideoJSComponent from "./VideoJSComponent";
import { useRef } from "react";
import Player from "video.js/dist/types/player";

export default function Wrapper() {
  const playerRef = useRef<Player>();
  const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 320,
    height: 240,
    fluid: false,
    plugins: {
      /*
      // wavesurfer section is only needed when recording audio-only
      wavesurfer: {
        backend: 'WebAudio',
        waveColor: '#36393b',
        progressColor: 'black',
        debug: true,
        cursorWidth: 1,
        msDisplayMax: 20,
        hideScrollbar: true,
        displayMilliseconds: true,
        plugins: [
          // enable microphone plugin
          WaveSurfer.microphone.create({
            bufferSize: 4096,
            numberOfInputChannels: 1,
            numberOfOutputChannels: 1,
            constraints: {
              video: false,
              audio: true
            }
          })
        ]
      },
      */
      record: {
        audio: true,
        video: true,
        maxLength: 10,
        debug: true,
      },
    },
  };

  const handlePlayerReady = (player: any) => {
    try {
      playerRef.current = player;

      // handle player events
      // device is ready
      player.on("deviceReady", () => {
        console.log("device is ready!");
      });

      // user clicked the record button and started recording
      player.on("startRecord", () => {
        console.log("started recording!");
      });

      // user completed recording and stream is available
      player.on("finishRecord", () => {
        // recordedData is a blob object containing the recorded data that
        // can be downloaded by the user, stored on server etc.
        console.log("finished recording: ", player.recordedData);
      });

      // error handling
      player.on("error", (element: any, error: any) => {
        console.warn(error);
      });

      player.on("deviceError", () => {
        console.error("device error:", player.deviceErrorCode);
      });
    } catch (error: any) {
      console.error("Something went wrong while getting player ready");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <VideoJSComponent options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}
