'use client';

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BackgroundContext } from './Background.context';
import { container } from './Background.css';
import { Scene } from './Scene';

export function Background() {
  const [dimensions, setDimensions] = useState({ width: 40, height: 40 });
  const pathname = usePathname();
  const isAnimated = pathname === '/welcome';

  return (
    <motion.div
      className={container}
      data-hidden={!isAnimated}
      initial={{ opacity: 0 }}
      animate={{ opacity: isAnimated ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <BackgroundContext.Provider value={{ isAnimated }}>
        <Canvas shadows>
          <Scene width={dimensions.width} height={dimensions.height} />
        </Canvas>
      </BackgroundContext.Provider>
    </motion.div>
  );
}
