import { Box, Button, Stack } from '@kadena/react-ui';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { Children, cloneElement, useRef, useState } from 'react';

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

// Something we might be able to use for the scroll-enlarge-effect: https://codesandbox.io/p/sandbox/fervent-pasteur-dqs9ry?file=%2FApp.js%3A75%2C18-75%2C25
export default function CardCollection({ children }: CardCollectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardRefs = useRef(new Array());

  const getAnimationVariant = (i: number) => {
    if (activeCard === i) {
      return 'active';
    }

    if (activeCard === null) {
      return 'expanded';
    }

    return 'collapsed';
  };

  const cardSpacing = 60; // we might need to select the "alias" container here to make sure it's always visible
  const cardHeight =
    cardRefs.current[0]?.querySelector('.card').offsetHeight || 0; // @TODO this doesn't work perfectly because some of the content is hidden when the card isn't active. When the card becomes active, the height increases

  return (
    <Box
      className={wrapper}
      style={{ overflow: `${activeCard === null ? 'scroll' : 'hidden'}` }}
    >
      <Stack className={inner} flexDirection="column" paddingBlockStart="lg">
        {Children.map(children, (child, i) => (
          <motion.div
            key={i}
            layout
            onClick={() => setActiveCard(i)}
            className={classnames(card, {
              [expanded]: activeCard === null,
              [active]: activeCard === i,
              [collapsed]: activeCard !== i,
            })}
            transition={{
              type: 'spring',
              damping: 44,
              stiffness: 480,
            }}
            animate={getAnimationVariant(i)}
            variants={{
              expanded: {
                marginBlockEnd: '20px',
              },
              collapsed: {
                marginBlockEnd: `${i * cardSpacing}px`,
              },
            }}
            style={{
              zIndex: `${100 - i}`,
              bottom:
                activeCard !== null && activeCard !== i
                  ? `-${cardHeight - cardSpacing}px`
                  : 'auto',
            }}
            ref={(ref) => (cardRefs.current[i] = ref)}
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
