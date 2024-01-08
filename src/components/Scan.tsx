import { Card } from '@kadena/react-ui';
import { useEffect, useRef, useState } from 'react';

const setupCamera = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
  const streamPromise = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: 'environment',
      height: { ideal: 1920 },
      width: { ideal: 1920 },
    },
  });

  initCamera(video, canvas, streamPromise);

  return function unloadCamera() {
    streamPromise.then((stream) => {
      video.pause();
      if (!stream) return;
      const tracks = stream.getTracks();

      tracks.forEach((track: any) => {
        track.stop();
      });

      video.srcObject = null;
    });
  };
};

const initCamera = async (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  streamPromise: Promise<MediaStream>,
) => {
  // Request the front-facing camera of the device
  const stream = await streamPromise;
  video.srcObject = stream;

  // Handle the video stream once it loads.
  await new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });

  video.play();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d');
};

export const Scan = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    return setupCamera(video, canvas);
  }, [shouldLoad]);
  return (
    <Card fullWidth>
      <button onClick={() => setShouldLoad(true)}>Start</button>
      <canvas ref={canvasRef} />
      <video ref={videoRef} />
    </Card>
  );
};
