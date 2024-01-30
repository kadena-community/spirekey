import { Box, Button, Stack } from '@kadena/react-ui';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { Children, cloneElement, useState } from 'react';

import {
  active,
  card,
  collapsed,
  expanded,
  inner,
  wrapper,
} from './CardCollection.css';

interface CardCollectionProps {
  children: any; // @TODO ReactElement/ReactNode?
}

export default function CardCollection({ children }: CardCollectionProps) {
  const [activeCard, setActiveCard] = useState<number>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Something we might be able to use for the scroll-enlarge-effect: https://codesandbox.io/p/sandbox/fervent-pasteur-dqs9ry?file=%2FApp.js%3A75%2C18-75%2C25

  return (
    <Box className={wrapper}>
      <Button onClick={() => setIsExpanded(!isExpanded)}>Expand</Button>
      <Stack className={inner} flexDirection="column" paddingBlockStart="lg">
        {Children.map(children, (child, i) => (
          <motion.div
            key={i}
            layout
            onClick={() => setActiveCard(i)}
            className={classnames(card, {
              [expanded]: isExpanded,
              [active]: activeCard === i,
              [collapsed]: activeCard !== i,
            })}
            transition={{
              type: 'spring',
              damping: 44,
              stiffness: 480,
            }}
            animate={activeCard !== i && !isExpanded && 'collapsed'}
            variants={{
              collapsed: {
                marginBlockEnd: `${i * 50}px`,
              },
            }}
            style={{
              zIndex: `${100 - i}`,
            }}
          >
            {cloneElement(child, {
              isActive: activeCard === i,
              isCollapsed: activeCard !== i,
            })}
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}
