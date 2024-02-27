'use client';

import { atoms } from '@kadena/react-ui/styles';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { createContext, useRef, useState } from 'react';
import { BackgroundContext } from './Background.context';
import { container } from './Background.css';
import { Scene } from './Scene';

export function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 40, height: 40 });
  const pathname = usePathname();
  const isAnimated = pathname === '/welcome';

  return (
    <motion.div
      ref={containerRef}
      className={container}
      data-hidden={!isAnimated}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <BackgroundContext.Provider value={{ isAnimated }}>
        <Canvas shadows>
          <Scene width={dimensions.width} height={dimensions.height} />
        </Canvas>
      </BackgroundContext.Provider>
    </motion.div>
  );
}
