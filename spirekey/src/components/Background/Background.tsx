'use client';

import { Canvas } from '@react-three/fiber';
import { getGPUTier } from 'detect-gpu';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BackgroundContext } from './Background.context';
import { container } from './Background.css';
import { Scene } from './Scene';

const shouldRenderAnimatedBackground = async () => {
  const { tier } = await getGPUTier();
  return tier > 2;
};
export function Background() {
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    shouldRenderAnimatedBackground().then(setIsAnimated);
  }, []);

  if (!isAnimated) return null;

  return (
    <motion.div
      className={container}
      initial={{ opacity: 0 }}
      animate={{ opacity: isAnimated ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <BackgroundContext.Provider value={{ isAnimated }}>
        <Canvas shadows>
          <Scene width={40} height={40} />
        </Canvas>
      </BackgroundContext.Provider>
    </motion.div>
  );
}
