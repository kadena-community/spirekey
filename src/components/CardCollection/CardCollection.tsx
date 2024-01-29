import { Box, Stack } from '@kadena/react-ui';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { Children, cloneElement, useState } from 'react';

import { active, card, collapsed, inner, wrapper } from './CardCollection.css';

interface CardCollectionProps {
  children: any; // @TODO ReactElement/ReactNode?
}

export default function CardCollection({ children }: CardCollectionProps) {
  const [activeCard, setActiveCard] = useState<number>();

  // Something we might be able to use for the scroll-enlarge-effect: https://codesandbox.io/p/sandbox/fervent-pasteur-dqs9ry?file=%2FApp.js%3A75%2C18-75%2C25

  return (
    <Stack flexDirection="column" className={wrapper}>
      <Box className={inner}>
        {Children.map(children, (child, i) => (
          <motion.div
            key={i}
            layout
            onClick={() => setActiveCard(i)}
            className={classnames(card, {
              [active]: activeCard === i,
              [collapsed]: activeCard !== i,
            })}
            transition={{ duration: 0.5 }}
            animate={activeCard !== i && 'collapsed'}
            variants={{
              active: {},
              collapsed: {
                marginBottom: `${i * 40}px`,
                zIndex: `${100 - i}`,
              },
            }}
          >
            {cloneElement(child, {
              isActive: activeCard === i,
              isCollapsed: activeCard !== i,
            })}
          </motion.div>
        ))}
      </Box>
    </Stack>
  );
}
