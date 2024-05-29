import { Box } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { progressBar, wrapper } from './ProgressBox.css';

interface Props {
  children: ReactNode;
  progress: number;
}

export const ProgressBox: FC<Props> = ({ progress, children }) => {
  return (
    <Box className={wrapper}>
      <motion.div
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className={progressBar}
      />
      {children}
    </Box>
  );
};
