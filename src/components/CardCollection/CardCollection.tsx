import { Box, Stack } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { Children, cloneElement, useRef, useState } from 'react';

import { card, inner, wrapper } from './CardCollection.css';

interface CardCollectionProps {
  children: any; // @TODO ReactElement/ReactNode?
}

// @TODO currently the collapsed stack is _styled_ the other way around. Ideally we'd have the same order as on the "expanded" view
// Something we might be able to use for the scroll-enlarge-effect: https://codesandbox.io/p/sandbox/fervent-pasteur-dqs9ry?file=%2FApp.js%3A75%2C18-75%2C25

export default function CardCollection({ children }: CardCollectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardRefs = useRef(new Array());

  console.log(activeCard);

  const getCardVariant = (i: number) => {
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
    cardRefs.current[0]?.querySelector('.card').offsetHeight || 0;

  return (
    <Box
      className={wrapper({
        variant: activeCard === null ? 'expanded' : 'collapsed',
      })}
    >
      <Stack className={inner} flexDirection="column" paddingBlockStart="lg">
        {Children.map(children, (child, i) => (
          <motion.div
            key={i}
            layout
            onClick={() => setActiveCard(i)}
            transition={{
              type: 'spring',
              damping: 44,
              stiffness: 480,
            }}
            className={card({ variant: getCardVariant(i) })}
            style={{
              zIndex: `${100 - i}`,
              bottom:
                activeCard !== null && activeCard !== i // There is an active card, but it's not this one
                  ? `-${cardHeight - (i + 1) * cardSpacing}px` // Position the card outside of the viewport, then move it up by the number of the card, multiplied by the spacing so the cards are stacked
                  : 'auto',
            }}
            ref={(ref) => (cardRefs.current[i] = ref)}
          >
            {cloneElement(child, {
              isActive: activeCard === i,
            })}
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}
