import { sprinkles } from '@kadena/react-ui/theme';
import * as base64url from 'base64url-universal';
import { Encoder } from 'qram';
import { toCanvas } from 'qrcode';
import { useEffect, useRef } from 'react';

type QRCodeProps = {
  url: string;
};

const renderQr = async (url: string, canvasRef: any) => {
  const data = Buffer.from(url);
  const encoder = new Encoder({
    data,
    blockSize: 256,
  });
  const timer = encoder.createTimer({ fps: 24 });
  const stream = await encoder.createReadableStream();

  const display = ({ packet }: any) => {
    return toCanvas(canvasRef.current, base64url.encode(packet.data), {
      width: 500,
    });
  };

  const reader = stream.getReader();
  timer.start();
  while (true) {
    const { value: packet, done } = await reader.read();
    if (done) {
      break;
    }

    await display({ packet });
    await timer.nextFrame();
  }
};
export const QRCode = ({ url }: QRCodeProps) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    renderQr(url, canvasRef);
  }, [url]);

  return (
    <canvas
      ref={canvasRef}
      className={sprinkles({
        width: '100%',
      })}
    />
  );
};
