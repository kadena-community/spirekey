import { Button } from '@/components/Button/Button';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { content, progressBar, wrapper } from './ProgressButton.css';

interface Props {
  children: ReactNode;
  progress: number;
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
}

export const ProgressButton: FC<Props> = ({
  onClick = () => {},
  progress,
  type = 'button',
  children,
}) => {
  return (
    <Button className={wrapper} onClick={onClick} type={type}>
      <motion.div
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className={progressBar}
      />
      <div className={content}>{children}</div>
    </Button>
  );
};
