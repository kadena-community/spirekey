import { Box, Button, Stack } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { Children, cloneElement, useRef, useState } from 'react';
import { useElementSize } from 'usehooks-ts';

import { card, inner, wrapper } from './CardCollection.css';

interface CardCollectionProps {
  children: any; // @TODO ReactElement/ReactNode?
}

// Something we might be able to use for the scroll-enlarge-effect: https://codesandbox.io/p/sandbox/fervent-pasteur-dqs9ry?file=%2FApp.js%3A75%2C18-75%2C25

export default function CardCollection({ children }: CardCollectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardRefs = useRef(new Array());
  const [innerRef, { height: innerHeight }] = useElementSize();

  const getCardVariant = (i: number) => {
    if (activeCard === i) {
      return 'active';
    }

    if (activeCard === null) {
      return 'expanded';
    }

    return 'collapsed';
  };

  const handleCardClick = (i: number) => {
    if (hasActiveCard && activeCard !== i) {
      setActiveCard(null);
    } else {
      setActiveCard(i);
    }
  };

  const collapsedCardSpacing = 15;
  const collapsedCardsVisible = 3;

  const cardHeight =
    cardRefs.current[0]?.querySelector('.card').offsetHeight || 0;

  const totalCardHeight = children.length * cardHeight;
  const excessHeight = totalCardHeight - (innerHeight - 30);
  const cardOverlap = (excessHeight / (children.length - 1)) * -1;

  const hasActiveCard = activeCard !== null;

  return (
    <Box className={wrapper}>
      <Stack className={inner} flexDirection="column" ref={innerRef}>
        {Children.map(children, (child, i) => {
          const marginBlockEnd =
            collapsedCardSpacing * collapsedCardsVisible -
            (hasActiveCard && activeCard < i ? i - 1 : i) *
              collapsedCardSpacing;

          return (
            <motion.div
              key={i}
              layout
              onClick={() => handleCardClick(i)}
              transition={{
                type: 'spring',
                damping: 44,
                stiffness: 280,
              }}
              className={card({ variant: getCardVariant(i) })}
              style={{
                zIndex: `${i}`,
                marginBlockEnd: `${
                  hasActiveCard ? marginBlockEnd : cardOverlap
                }px`,
                // marginBlockEnd: hasActiveCard
                // ? `${marginBlockEnd}px` // there is an active card
                // : `${cardSpacing}px`, // no active card
                bottom:
                  hasActiveCard && activeCard !== i ? `-${cardHeight}px` : 0,
                // activeCard !== null && activeCard !== i // There is an active card, but it's not this one
                //   ? `${cardHeight - collapsedCardSpacing * (i + 1)}px` // Position the card outside of the viewport, then move it up by the number (i + 1) of the card multiplied by the spacing to make them stack
                //   : // ? `-${cardHeight - (i + 1) * 60}px` // Position the card outside of the viewport, then move it up by the number (i + 1) of the card multiplied by the spacing to make them stack
                //     '0',
              }}
              ref={(ref) => (cardRefs.current[i] = ref)}
            >
              {cloneElement(child, {
                isActive: activeCard === i,
              })}
            </motion.div>
          );
        })}
      </Stack>
    </Box>
  );
}
