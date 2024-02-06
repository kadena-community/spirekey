'use client';

import { atoms } from '@kadena/react-ui/styles';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import { Scene } from './Scene';

const BLOCK_WIDTH = 1;

export function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 40, height: 40 });

  return (
    <div
      ref={containerRef}
      className={atoms({
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: -1,
      })}
      style={{
        height: '100%',
      }}
    >
      <Canvas shadows>
        <Scene width={dimensions.width} height={dimensions.height} />
      </Canvas>
    </div>
  );
}
