import { atoms } from '@kadena/react-ui/styles';
import FlipMove from 'react-flip-move';

interface CardCollectionProps {
  children: React.ReactNode;
}

export default function CardCollection({ children }: CardCollectionProps) {
  // Something we might be able to use for the scroll-enlarge-effect: https://codesandbox.io/p/sandbox/fervent-pasteur-dqs9ry?file=%2FApp.js%3A75%2C18-75%2C25
  return (
    <FlipMove
      className={atoms({
        height: '100%',
        width: '100%',
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
