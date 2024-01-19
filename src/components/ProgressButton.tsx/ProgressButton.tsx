import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { content, progressBar, wrapper } from './ProgressButton.css';

interface Props {
  children: ReactNode;
  progress: number;
  onClick: () => void;
}

export const ProgressButton: FC<Props> = ({
  onClick = () => {},
  progress,
  children,
}) => {
  return (
    <button className={wrapper} onClick={onClick}>
      <motion.div
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className={progressBar}
      />
      <div className={content}>{children}</div>
    </button>
  );
};
