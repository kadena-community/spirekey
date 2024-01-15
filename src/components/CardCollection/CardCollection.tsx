import { atoms } from '@kadena/react-ui/theme';
import FlipMove from 'react-flip-move';

interface CardCollectionProps {
  children: React.ReactNode;
}

export default function CardCollection({ children }: CardCollectionProps) {
  return (
    <FlipMove
      className={atoms({
        height: '100%',
        width: '100%',
        paddingInline: 'md',
        display: 'flex',
        flexDirection: 'column',
        gap: 'md',
      })}
      duration={500}
      delay={0}
      easing="cubic-bezier(0.39, 0, 0.45, 1.4)"
      staggerDurationBy={22}
      staggerDelayBy={0}
    >
      {children}
    </FlipMove>
  );
}
