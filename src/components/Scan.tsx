import { Card } from '@kadena/react-ui';
import { sprinkles } from '@kadena/react-ui/theme';
import * as base64url from 'base64url-universal';
import { useRouter } from 'next/navigation';
import QRScanner from 'qr-scanner';
import { Decoder } from 'qram';
import { useEffect, useRef, useState } from 'react';

const setupCamera = (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  setResult: any,
) => {
  const streamPromise = navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: 'environment',
      height: { ideal: 1920 },
      width: { ideal: 1920 },
    },
  });

  initCamera(video, canvas, streamPromise, setResult);

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
  setResult: any,
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

  parseQRCode(video, setResult);
};

const parseQRCode = async (video: HTMLVideoElement, setResult: any) => {
  const decoder = new Decoder();

  const scanner = new QRScanner(
    video,
    (result) => {
      if (result) {
        decoder
          .enqueue(base64url.decode(result.data))
          .then((progress: any) => {
            if (progress.done) scanner.stop();
          })
          .catch((e: any) => {
            if (e.name === 'AbortError') scanner.stop();
          });
      }
    },
    { highlightScanRegion: true },
  );

  try {
    // result found
    scanner.start();
    const { data } = await decoder.decode();
    const textDecoder = new TextDecoder();
    setResult(textDecoder.decode(data));
  } catch (e) {
    // failure to decode
    console.error(e);
  }
};

export const Scan = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [result, setResult] = useState('');
  const toggleLoad = () => setShouldLoad(!shouldLoad);
  const router = useRouter();

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    return setupCamera(video, canvas, setResult);
  }, [shouldLoad]);
  useEffect(() => {
    if (!result) return;
    router.push(result);
  }, [result]);
  return (
    <Card fullWidth>
      <button onClick={toggleLoad}>{!shouldLoad ? 'Scan' : 'Stop'}</button>
      {result && <p>{result}</p>}
      {shouldLoad && (
        <div>
          <video ref={videoRef} />
          <canvas
            ref={canvasRef}
            className={sprinkles({
              position: 'absolute',
            })}
          />
        </div>
      )}
    </Card>
  );
};
