import { useEffect, useState } from 'react';
import { MaskedValue } from '../MaskedValue/MaskedValue';

type AccountRevealerProps = {
  accountName: string;
  reveal: boolean;
  className?: string;
};
export const AccountRevealer = ({
  accountName,
  reveal,
  className,
}: AccountRevealerProps) => {
  const [startTime] = useState(Date.now());
  const [displayName, setDisplayName] = useState(
    Array(accountName.length).fill('.').join(''),
  );

  useEffect(() => {
    if (!accountName) return;
    const timer = setInterval(() => {
      const now = Date.now();
      const timeElapsed = now - startTime;
      const pos = Math.floor(timeElapsed / 1000 / 2);
      const char = String.fromCharCode(97 + (Date.now() % 26));

      setDisplayName((currentName) => {
        const newDisplayName = [...currentName].reduce((n, c, i) => {
          if (
            i === accountName.length - 3 &&
            pos > accountName.length &&
            !reveal
          )
            return n + char;
          if (pos > accountName.length && reveal) clearInterval(timer);
          if (i === pos) return n + char;
          if (i < pos)
            return [...accountName.replace(/^c\:/, '')]
              .slice(0, i + 1)
              .join('');
          return n + c;
        }, '');
        return newDisplayName;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [accountName, reveal]);

  return (
    <MaskedValue
      value={`c:${displayName}`}
      startUnmaskedValues={16}
      className={className}
    />
  );
};
