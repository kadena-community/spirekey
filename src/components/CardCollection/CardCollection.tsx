import { Box, Stack } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { Children, useRef, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';

import { useAccounts } from '@/context/AccountsContext';
import { Account } from '../Account/Account';
import { card, inner, wrapper } from './CardCollection.css';

interface CardCollectionProps {
  returnUrl?: string;
  optimistic?: boolean;
}

// Something we might be able to use for the scroll-enlarge-effect: https://codesandbox.io/p/sandbox/fervent-pasteur-dqs9ry?file=%2FApp.js%3A75%2C18-75%2C25
export default function CardCollection({
  returnUrl,
  optimistic,
}: CardCollectionProps) {
  const { accounts } = useAccounts();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Array());
  const { height: innerHeight = 0 } = useResizeObserver({ ref: innerRef });

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
    cardRefs.current[0]?.querySelector('.card')?.offsetHeight || 0;

  const totalCardHeight = accounts.length * cardHeight;
  const excessHeight = totalCardHeight - (innerHeight - 30);
  const cardOverlap = (excessHeight / (accounts.length - 1)) * -1;

  const hasActiveCard = activeCard !== null;

  return (
    <Box className={wrapper}>
      <Stack className={inner} flexDirection="column" ref={innerRef}>
        {accounts.map((account, i) => {
          const marginBlockEnd =
            collapsedCardSpacing * collapsedCardsVisible -
            (hasActiveCard && activeCard < i ? i - 1 : i) *
              collapsedCardSpacing;

          return (
            <motion.div
              key={account.accountName + account.network}
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
                bottom:
                  hasActiveCard && activeCard !== i ? `-${cardHeight}px` : 0,
              }}
              ref={(ref) => (cardRefs.current[i] = ref)}
            >
              <Account
                key={account.accountName + account.network}
                account={account}
                returnUrl={returnUrl}
                optimistic={optimistic}
                isActive={activeCard === i}
              />
            </motion.div>
          );
        })}
      </Stack>
    </Box>
  );
}
